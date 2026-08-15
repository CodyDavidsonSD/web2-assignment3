'use client'
import Image from "next/image";
import { movieList, MovieType } from "@/data/DummyMovies";
import Movie from "./components/Movie";
//<h1 className="text-lg md:text-2xl text-mist-50 font-bold text-center mt-2 md:mt-4">MR. MOVIES</h1>

export default function Home() {
  const movies: MovieType[] = movieList

  return (
    <main className="h-screen bg-mist-950 text-center mt-6">
      <p className="text-mist-50">The start to your movie renting & watching days.</p>
    </main>
  );
}
