import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useMovieFetch from "../hooks/useMovieFetch";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const { movies, isPending, isError } = useMovieFetch(category, page);

  if (isError) {
    return (
      <div>
        <span className="text-2xl text-red-500">Error occurred.</span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex items-center justify-center gap-6">
        <button
          className="cursor-pointer rounded-lg bg-[#dda5e3] px-6 py-3 text-white shadow-md transition-all duration-200 hover:bg-[#b2dab1] disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={page === 1}
          onClick={(): void => setPage((prev): number => prev - 1)}
        >
          {`<`}
        </button>
        <span>{page} page</span>
        <button
          className="cursor-pointer rounded-lg bg-[#dda5e3] px-6 py-3 text-white shadow-md transition-all duration-200 hover:bg-[#b2dab1] disabled:bg-gray-300"
          onClick={(): void => setPage((prev): number => prev + 1)}
        >
          {`>`}
        </button>
      </div>

      {isPending && (
        <div className="flex h-dvh items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="grid grid-cols-2 gap-4 p-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviePage;
