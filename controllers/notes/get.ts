import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { notesCollection } from './notes.ts';

export const getNotes = async (ctx: RouterContext) => {
  ctx.response.body = 200;
  ctx.response.body = await notesCollection.find().toArray();
};
