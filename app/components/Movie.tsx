"use client";
import { useState } from "react";
import Link from "next/link";
import { deleteMovie } from "@/lib/helperfunctions";
import { useRouter } from "next/navigation";

type MovieTypewID = {
  id: string;
  title: string;
  actor_list: string[];
  release_year: number;
};

type MovieProps = {
  movie: MovieTypewID;
};

const Movie = ({ movie }: MovieProps) => {
  const [actorsOpen, setActorsOpen] = useState(false);
  const router = useRouter();

  const title = movie.title;
  const actors = movie.actor_list;
  const year = movie.release_year;

  function toggleActors() {
    setActorsOpen(!actorsOpen);
  }

  async function movieDeletion() {
    await deleteMovie(movie.id);
    router.refresh();
  }

  return (
    <div className="flex flex-col border rounded-lg border-mist-700 p-2 md:p-4 w-md md:w-2xl place-self-center m-2">
      <div className="flex flex-row justify-between mx-2">
        <p className="text-mist-50 text-lg md:text-xl font-bold">{title}</p>
        <p className="text-mist-400 font-medium md:text-lg">Released: {year}</p>
      </div>
      <button
        className="m-2 border rounded-lg border-mist-700 "
        onClick={toggleActors}
      >
        <p className="md:text-lg text-mist-100 text-center">Actors</p>
        {actorsOpen && (
          <div className="grid grid-cols-2 md:grid-cols-4 justify-between border-t border-mist-800 mx-4 py-2">
            {actors.map((actor) => (
              <p key={actor} className="text-mist-300 pl-2 text-sm">
                {actor}
              </p>
            ))}
          </div>
        )}
      </button>
      <div className="flex flex-row justify-between px-8">
        <Link
          href={`/${movie.id}/EditMovie`}
          className="text-gray-600 underline"
        >
          Edit
        </Link>
        <button onClick={movieDeletion} className="text-red-400 underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Movie;
