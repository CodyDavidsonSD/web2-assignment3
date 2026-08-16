"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  MovieFormSchema,
  MovieFormInput,
} from "@/app/schemas/AddMovieFormSchema";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { insertMovie } from "@/lib/helperfunctions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type MovieType = {
  title: string;
  actor_list: string[];
  release_year: number;
};

export default function AddMovieForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<
    z.input<typeof MovieFormSchema>,
    any,
    z.output<typeof MovieFormSchema>
  >({
    resolver: zodResolver(MovieFormSchema),
    defaultValues: {
      title: "",
      actor_list: [{ name: "" }],
      release_year: "" as unknown as number,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "actor_list",
  });

  async function onSubmit(data: MovieFormInput) {
    const movie: MovieType = {
      title: data.title,
      actor_list: data.actor_list.map((a) => a.name),
      release_year: data.release_year,
    };

    insertMovie(movie);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/Movie");
    }
  }, [isSubmitSuccessful, router]);

  return (
    //change styling possibly
    <div className="bg-slate-900 dark:bg-slate-900 px-8 pt-8 pb-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2 text-center border-b border-slate-600 text-slate-100">
        Add Movie
      </h2>
      <form
        className="flex flex-col py-2 gap-1 bg-slate-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="">Title</label>
          <input {...register("title")} className="" />
          {errors.title && <p className="">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Actors</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                {...register(`actor_list.${index}.name` as const)}
                className=""
                placeholder={`Actor #${index + 1}`}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className=""
                >
                  x
                </button>
              )}
            </div>
          ))}
          {errors.actor_list && <p className="">{errors.actor_list.message}</p>}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className=""
          >
            + Add Actor
          </button>
        </div>

        <div>
          <label className="">Release Year</label>
          <input type="number" {...register("release_year")} className="" />
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
            "Add Movie"
          )}
        </button>
      </form>
    </div>
  );
}
