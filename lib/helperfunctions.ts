import { createClient } from "@supabase/supabase-js";
import { MovieType } from "../data/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

type MovieTypewID = {
  id: string;
  title: string;
  actor_list: string[];
  release_year: number;
};

export async function getMovies(): Promise<MovieTypewID[] | undefined> {
  const { data, error } = await supabase.from("movies").select("*");

  if (error) {
    console.error("Error fetching data:", error.message);
    return;
  }

  return data;
}

export async function getMovie(id: string): Promise<MovieType | undefined> {
  const { data, error } = await supabase
    .from("movies")
    .select("title, actor_list, release_year")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    return;
  }

  if (!data) {
    return undefined;
  }

  return data;
}

export async function insertMovie(
  movie: Omit<MovieTypewID, "id">,
): Promise<MovieTypewID | undefined> {
  const { data, error } = await supabase
    .from("movies")
    .insert([movie])
    .select()
    .single();

  if (error) {
    console.error("Error inserting movie:", error.message);
    return;
  }

  return data;
}

export async function updateMovie(
  id: string,
  updates: MovieType,
): Promise<MovieTypewID | undefined> {
  const { data, error } = await supabase
    .from("movies")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating movie:", error.message);
    return;
  }

  return data;
}

export async function deleteMovie(id: string) {
  const { error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    console.error("Error deleting movie:", error.message);
  }
}
