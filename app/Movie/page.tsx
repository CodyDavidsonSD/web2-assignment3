"use client";
import Movie from "../components/Movie";
import { useEffect, useState } from "react";
import { getMovies } from "@/lib/helperfunctions";
import Link from "next/link";

type MovieType = {
  id: string;
  title: string;
  actor_list: string[];
  release_year: number;
};

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies();
      if (data) setMovies(data);
    }

    fetchMovies();
  }, []);

  return (
    <main className="h-screen bg-mist-950">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
      <Link href="/AddMovie">Add Movie</Link>
    </main>
  );
}
