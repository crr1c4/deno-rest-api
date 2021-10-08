import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { usersCollection, notesCollection } from '../collections.ts';

export const deleteUser = async (ctx: RouterContext) => {
  const { userId } = ctx.params;

  // Delete notes of the deleted user
  await notesCollection.deleteMany({
    author: new Bson.ObjectId(userId),
  });

  const deleteCount = await usersCollection.deleteOne({
    _id: new Bson.ObjectId(userId),
  });

  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note doesn´t exist' };
    return;
  }

  ctx.response.status = 204;
};
