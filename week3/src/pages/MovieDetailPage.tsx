import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetail, MovieDetailResponse } from "../types/MovieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setISError] = useState(false);
  const { movieId } = useParams<{ movieId: string }>();

  useEffect((): void => {
    const fetchMovieDetail = async (): Promise<void> => {
      if (!movieId) return;

      setIsPending(true);
      setISError(false);

      try {
        const { data } = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );
        setMovieDetail(data);
      } catch {
        setISError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && movieDetail && (
        <>
          <div className="flex flex-col">
            <h2>{movieDetail.title}</h2>
            <div>평균 {movieDetail.vote_average}</div>
            <div>{movieDetail.release_date}</div>
            <div>{movieDetail.runtime} 분</div>
            <div>{movieDetail.overview}</div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
          </div>
          <div>
            <h2>감독/출연</h2>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailPage;
