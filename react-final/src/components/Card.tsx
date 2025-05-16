import Rating from "./Rating";
import { Movie, Serie } from "../interface/MediaInterface";

interface CardProps {
  element: Movie | Serie;
  date: string;
}

export default function Card({ element, date }: CardProps) {
  return (
    <div className="card-container">
      <div className="card-content">
        <img
          src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
          alt={element.title || element.name}
        />
        <h4 className="title">{element.title || element.name}</h4>
        <p className="year">{date}</p>
        <span> {<Rating vote_average={element.vote_average} />}</span>
      </div>
    </div>
  );
}
