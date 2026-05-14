import axios from "axios";
import { useEffect, useState } from "react";
import type {
  MovieCreditResponse,
  MovieDetail,
  MovieDetailResponse,
} from "../types/MovieDetail";

type UseMovieDetailFetchResult = {
  movieDetail: MovieDetail | null;
  movieCredits: MovieCreditResponse | null;
  isPending: boolean;
  isError: boolean;
};

const useMovieDetailFetch = (
  movieId: string | undefined,
): UseMovieDetailFetchResult => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCreditResponse | null>(
    null,
  );
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    if (!movieId) {
      setMovieDetail(null);
      setMovieCredits(null);
      return;
    }

    const fetchMovieDetail = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const [detailResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetailResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            },
          ),
          axios.get<MovieCreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            },
          ),
        ]);

        setMovieDetail(detailResponse.data);
        setMovieCredits(creditsResponse.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return { movieDetail, movieCredits, isPending, isError };
};

export default useMovieDetailFetch;
