import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../css/CastCrew.css";
import CastCard from "./CastCard";
import { Cast } from "../interface/castInterface";
import { MediaType } from "../interface/MediaInterface";

export default function CastCrew() {
  const { mediaType, id } = useParams<{ mediaType: MediaType; id: string }>();

  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
    },
  };

  const getCastCrew = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
        options
      );
      const result = await response.json();
      setCast(result.cast);
      setCrew(result.crew);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCastCrew();
  }, [id]);

  return (
    <div className="container">
      <h2>Cast</h2>
      <div className="grid-horizontal">
        {loading ? (
          <h4 className="loading">Loading...</h4>
        ) : (
          cast.map((actor: Cast) => (
            <CastCard actor={actor} key={actor.cast_id} />
          ))
        )}
      </div>

      <h2>Crew</h2>
      <div className="grid-horizontal">
        {loading ? (
          <h4 className="loading">Loading...</h4>
        ) : (
          crew.map((actor: Cast) => (
            <CastCard actor={actor} key={actor.credit_id} />
          ))
        )}
      </div>
    </div>
  );
}
