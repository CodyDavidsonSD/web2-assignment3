"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MovieFormSchema,
  MovieFormInput,
} from "@/app/schemas/EditMovieFormSchema";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { getMovie, updateMovie } from "@/lib/helperfunctions";
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

type MovieType = {
  title: string;
  actor_list: string[];
  release_year: number;
};

interface EditMovieFormProps {
  params: Promise<{ id: string }>;
}

export default function EditMovieForm({ params }: EditMovieFormProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MovieFormInput>({
    resolver: zodResolver(MovieFormSchema),
    defaultValues: {
      title: "",
      actor_list: [{ name: "" }],
      release_year: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "actor_list",
  });

  useEffect(() => {
    async function loadMovieData() {
      try {
        const movieData = await getMovie(id);

        if (!movieData) {
          console.error("Movie not found");
          return;
        }

        const mappedActors =
          movieData.actor_list?.map((actorName: string) => ({
            name: actorName,
          })) || [];

        reset({
          title: movieData.title || "",
          actor_list: mappedActors.length > 0 ? mappedActors : [{ name: "" }],
          release_year: movieData.release_year || 0,
        });
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    }

    if (id) {
      loadMovieData();
    }
  }, [id, reset]);

  async function onSubmit(data: MovieFormInput) {
    const movie: MovieType = {
      title: data.title,
      actor_list: data.actor_list.map((a) => a.name),
      release_year: data.release_year,
    };

    updateMovie(id, movie);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/Movie");
    }
  }, [isSubmitSuccessful, router]);

  return (
    //change styling possibly
    <div className="bg-mist-950 px-8 pt-8 pb-4 rounded-lg mb-4 min-h-screen">
      <h2 className="text-lg font-semibold mb-2 text-center border-b border-slate-600 text-slate-100">
        Edit Movie
      </h2>
      <form
        className="flex flex-col py-2 gap-1 bg-mist-800 p-8 border border-mist-600 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-mist-100 text-lg mx-2">Title</label>
          <input {...register("title")} className="border rounded-md border-mist-600 p-2 text-gray-900 bg-mist-200" />
          {errors.title && <p className="">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-mist-300 text-lg mx-2">Actors</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                {...register(`actor_list.${index}.name` as const)}
                className="text-mist-300"
                placeholder={`Actor #${index + 1}`}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-mist-300 hover:text-red-600 text-lg" /* large gray, on hover turns red */
                >
                  x
                </button>
              )}
            </div>
          ))}
          {errors.actor_list && <p className="text-red-600 text-sm">{errors.actor_list.message}</p>}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="text-mist-200 text-lg p-2 border border-mist-700 rounded-md bg-mist-600 hover:bg-mist-700"
          >
            + Add Actor
          </button>
        </div>

        <div>
          <label className="text-mist-300 mr-2">Release Year</label>
          <input
            type="number"
            {...register("release_year", { valueAsNumber: true })}
            className="border border-mist-600 bg-mist-100 text-gray-950 rounded-md p-2"
          />
          {errors.release_year && (
            <p className="">{errors.release_year.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
        >
          {isSubmitting ? (
            <>
              <Icon path={mdiLoading} size={0.7} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
