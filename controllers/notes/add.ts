import { notesCollection } from '../collections.ts';
import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import type { Note, RequestBody, User } from '../collections.ts';

export const addNote = async (ctx: RouterContext) => {
  const { title, description }: RequestBody = await ctx.request.body().value;
  const user: User = ctx.state.user;

  const note: Note = {
    title,
    description,
    checked: false,
    date: new Date(),
    author: user?._id!,
  };

  const id = await notesCollection.insertOne(note);
  note._id = id;

  ctx.response.status = 201;
  ctx.response.body = {
    message: 'Note created',
    note,
  };
};
