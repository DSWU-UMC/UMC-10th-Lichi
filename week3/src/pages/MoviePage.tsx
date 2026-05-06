import React, { useEffect, useState } from "react";
import axios from "axios";
import { type MovieResponse, type Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MoviePage = (): Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setISError] = useState(false);
  // 3. 페이지
  const [page, setPage] = useState(1);

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      // 데이터 호출 시작 시 로딩 상태 true로 변경
      setIsPending(true);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );
        setMovies(data.results);
        // 데이터 성공적으로 호출 후 로딩 상태 false로 변경
      } catch {
        setISError(true);
      } finally {
        // 모든 구문에 대해 실행되는 finally 구문을 사용하여 중복 제거
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {/* 페이지 버튼들 */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1} // 페이지가 1일 때는 이전 버튼 비활성화
          onClick={(): void => setPage((prev): number => prev - 1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer"
          onClick={(): void => setPage((prev): number => prev + 1)}
        >{`>`}</button>
      </div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map(
            (movie): Element => (
              <MovieCard key={movie.id} movie={movie} />
            ),
          )}
        </div>
      )}
    </>
  );
};

export default MoviePage;
