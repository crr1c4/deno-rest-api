import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import type { Note, RequestBody } from "../collections.ts";
import { notesCollection, usersCollection } from "../collections.ts";

export const addNote = async (ctx: RouterContext) => {
  const { title, description }: RequestBody = await ctx.request.body().value;
  const { username } = ctx.params;
  const user = await usersCollection.findOne({
    username,
  });

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: 'User doesn´t exist',
    };
    return;
  }

  const note: Note = {
    title,
    description,
    checked: false,
    date: new Date(),
    author: user._id!
  };

  const id = await notesCollection.insertOne(note);
  note._id = id;

  ctx.response.status = 201;
  ctx.response.body = {
    message: 'Note created',
    note,
  };
}