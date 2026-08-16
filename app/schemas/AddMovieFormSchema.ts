import { z } from "zod";

export const MovieFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  actor_list: z
    .array(
      z.object({
        name: z.string().min(1, "Actor name cannot be empty."),
      }),
    )
    .min(1, "Please add at least one actor."),
  release_year: z
    .preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ required_error: "Release year cannot be empty" }),
    )
    .refine(
      (val) => val <= new Date().getFullYear(),
      "Release year cannot be greater than current year.",
    ),
});

export type MovieFormInput = z.infer<typeof MovieFormSchema>;

export const movieDbSchema = MovieFormSchema.extend({
  actor_list: z.array(z.string()),
});
