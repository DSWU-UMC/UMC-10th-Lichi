import React from "react";
import type { MovieCreditResponse } from "../types/MovieDetail";

const Credits = ({ credits }: { credits: MovieCreditResponse | null }) => {
  return (
    <div>
      {credits && (
        <>
          <div className="font-display px-10 mt-6 mb-6 flex gap-12 flex-wrap justify-center">
            {credits.cast.map((actor) => (
              <div
                key={actor.id}
                className="flex w-28 shrink-0 flex-col items-center"
              >
                <img
                  className="h-28 w-28 shrink-0 rounded-full object-cover mb-2 border-2 border-gray-300 hover:scale-105 hover:transition-transform duration-200"
                  src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                  alt={actor.name}
                />
                <div className="text-sm font-semibold text-center">
                  {actor.name}
                </div>
                <div className="text-sm text-gray-500 text-center">
                  {actor.character}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Credits;
