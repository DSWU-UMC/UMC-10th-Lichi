import type { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps): Element => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 포스터`}
      />
    </div>
  );
};

export default MovieCard;
