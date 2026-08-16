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
    .number()
    .int()
    .min(1, "Must include a valid release year.")
    .max(new Date().getFullYear()),
});

export type MovieFormInput = z.infer<typeof MovieFormSchema>;

export const movieDbSchema = MovieFormSchema.extend({
  actor_list: z.array(z.string()),
});
