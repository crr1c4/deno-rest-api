import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { notesCollection } from "./notes.ts";
import type { Note, RequestBody } from "./notes.ts";

export const addNote = async (ctx: RouterContext) => {
  const { title, description }: RequestBody = await ctx.request.body().value;

  const note: Note = {
    title,
    description,
    checked: false,
    date: new Date(),
  };

  const id = await notesCollection.insertOne(note);
  note._id = id;

  ctx.response.status = 201;
  ctx.response.body = {
    message: 'Note created',
    note,
  };
}