import axios from "axios";
import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/Movie";

type UseMovieFetchResult = {
  movies: Movie[];
  isPending: boolean;
  isError: boolean;
};

const useMovieFetch = (
  category: string | undefined,
  page: number,
): UseMovieFetchResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    if (!category) {
      setMovies([]);
      return;
    }

    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );

        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return { movies, isPending, isError };
};

export default useMovieFetch;
