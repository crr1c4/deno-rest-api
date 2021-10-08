import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { notesCollection, usersCollection } from '../collections.ts';

export const deleteNote = async (ctx: RouterContext) => {
  const { id, username } = ctx.params;
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

  const deleteCount = await notesCollection.deleteOne({
    _id: new Bson.ObjectId(id),
    author: new Bson.ObjectId(user._id),
  });

  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note doesn´t exist' };
    return;
  }

  ctx.response.status = 204;
};
