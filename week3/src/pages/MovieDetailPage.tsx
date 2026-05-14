import { useParams } from "react-router-dom";
import Credits from "../components/Credits";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useMovieDetailFetch from "../hooks/useMovieDetailFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movieDetail, movieCredits, isPending, isError } =
    useMovieDetailFetch(movieId);

  if (isError) {
    return (
      <div>
        <span className="text-2xl text-red-500">Error occurred.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex h-dvh items-center justify-center">
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
              <div>Rating {movieDetail.vote_average}</div>
              <div>{movieDetail.release_date}</div>
              <div>{movieDetail.runtime} min</div>
              <div>{movieDetail.tagline}</div>
              <p className="max-w-4xl leading-7">{movieDetail.overview}</p>
            </div>
          </section>

          <div className="font-display">
            <h2 className="px-5 py-5 text-2xl font-semibold">Cast</h2>
            <Credits credits={movieCredits} />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailPage;
