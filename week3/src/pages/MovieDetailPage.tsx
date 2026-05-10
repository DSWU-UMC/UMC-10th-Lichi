import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type {
  MovieCreditResponse,
  MovieDetail,
  MovieDetailResponse,
} from "../types/MovieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Credits from "../components/Credits";

const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCreditResponse | null>(
    null,
  );
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
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );

        const { data: creditsData } = await axios.get<MovieCreditResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );

        setMovieDetail(data);
        setMovieCredits(creditsData);
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
          <section className="relative min-h-[420px] overflow-hidden bg-neutral-900">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/w1280${
                movieDetail.backdrop_path ?? movieDetail.poster_path
              }`}
              alt={movieDetail.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

            <div className="relative z-10 flex min-h-[420px] max-w-5xl flex-col justify-center gap-3 px-10 py-12 font-display text-white">
              <h2 className="text-2xl font-semibold">{movieDetail.title}</h2>
              <div>평균 {movieDetail.vote_average}</div>
              <div>{movieDetail.release_date}</div>
              <div>{movieDetail.runtime} 분</div>
              <div>{movieDetail.tagline}</div>
              <p className="max-w-4xl leading-7">{movieDetail.overview}</p>
            </div>
          </section>

          <div className="font-display">
            <h2 className="text-2xl font-semibold px-5 py-5">감독/출연</h2>
            <Credits credits={movieCredits} />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailPage;
