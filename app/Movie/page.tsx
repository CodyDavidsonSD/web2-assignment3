'use client'
import Image from "next/image";
import { movieList, MovieType } from "@/data/DummyMovies";
import Movie from "../components/Movie";

export default function Home() {
  const movies: MovieType[] = movieList

  return (
    <main className="h-screen bg-mist-950">
      {movies.map((movie)=> (
           <Movie key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
