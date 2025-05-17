import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { Movie } from "../interface/MediaInterface";
import { options } from "../utils/authKey";
import  {scrollById}  from "../utils/handleScroll";
import "../css/Search.css";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [popularMovies, setpopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);

  const category = ["popular", "now_playing", "top_rated", "upcoming"];

  // const handleSearch = async () => {
  //   try {
  //     const url = `https://api.themoviedb.org/3/movie/popular`;
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
  //       },
  //     };

  //     fetch(url, options)
  //       .then((res) => res.json())
  //       .then((popularMovies) => setpopularMovies(popularMovies.results))
  //       .catch((err) => console.error(err));
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
  //   },
  // };

  const getMovies = async (category: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}`,
        options
      );
      const movies = await response.json();
      switch (category) {
        case "popular":
          setpopularMovies(movies.results);
          break;
        case "now_playing":
          setNowPlaying(movies.results);
          break;
        case "top_rated":
          setTopRated(movies.results);
          break;
        case "upcoming":
          setAiringToday(movies.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    category.forEach((element) => {
      getMovies(element);
    });
  }, []);

  //All movies
  const allMovies = [
    ...popularMovies,
    ...nowPlaying,
    ...topRated,
    ...airingToday,
  ];

  const uniqueMovies = new Set();
  const uniqueItems = allMovies.filter((movie: Movie) => {
    if (uniqueMovies.has(movie.id)) {
      return false;
    }
    uniqueMovies.add(movie.id);
    return true;
  });

  const searchResult = uniqueItems.filter((movie: Movie) =>
    movie.title.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : //  search
      search.length > 0 ? (
        <div className="grid">
          {searchResult.map((result: Movie) => (
            <Link
              to={`/movie/${result.id}`}
              key={result.id}
              className="search-result"
            >
              <Card
                key={result.id}
                element={result}
                date={result.release_date.split("-")[0]}
              />
            </Link>
          ))}
        </div>
      ) : (
        <>
          <h3 className="category">Popular movies</h3>
          <div className="grid">
            {popularMovies.map((popularMovie: Movie) => (
              <Link to={`/movie/${popularMovie.id}`} key={popularMovie.id}>
                <Card
                  element={popularMovie}
                  date={popularMovie.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h3 className="category">Now Playing</h3>
          {/* scroll */}

          <div className="grid-horizontal" id="playingMovies">
            {nowPlaying.map((playing: Movie) => (
              <Link to={`/movie/${playing.id}`} key={playing.id}>
                <Card
                  element={playing}
                  date={playing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>
           <div className="scroll-container">
            <button
              className="btn-scroll"
              onClick={() => scrollById("playingMovies", "left")}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} className="scroll" />
            </button>
            <button
              className="btn-scroll"
              onClick={() => scrollById("playingMovies", "right")}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} className="scroll" />
            </button>
          </div>


          <h3 className="category">Top rated</h3>
         
          <div className="grid-horizontal" id="topRatedMovies">
            {topRated.map((rated: Movie) => (
              <Link to={`/movie/${rated.id}`} key={rated.id}>
                <Card element={rated} date={rated.release_date.split("-")[0]} />
              </Link>
            ))}
          </div>
           <div className="scroll-container">
            <button
              className="btn-scroll"
              onClick={() => scrollById("topRatedMovies", "left")}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} className="scroll" />
            </button>
            <button
              className="btn-scroll"
              onClick={() => scrollById("topRatedMovies", "right")}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} className="scroll" />
            </button>
          </div>

          <h3 className="category">Upcoming</h3>
          
          <div className="grid-horizontal" id="upcomingMovies">
            {airingToday.map((airing: Movie) => (
              <Link to={`/movie/${airing.id}`} key={airing.id}>
                <Card
                  element={airing}
                  date={airing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>
           <div className="scroll-container">
            <button
              className="btn-scroll"
              onClick={() => scrollById("upcomingMovies", "left")}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} className="scroll" />
            </button>
            <button
              className="btn-scroll"
              onClick={() => scrollById("upcomingMovies", "right")}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} className="scroll" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
