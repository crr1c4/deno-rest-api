import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { notesCollection } from './notes.ts';

export const deleteNote = async (ctx: RouterContext) => {
  const { id } = ctx.params;
  const deleteCount = await notesCollection.deleteOne({
    _id: new Bson.ObjectId(id),
  });

  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note doesn´t exist' };
    return;
  }

  ctx.response.status = 204;
};
