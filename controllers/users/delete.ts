import type { RouterContext } from 'oak';
import { Bson } from 'mongo';
import { usersCollection, notesCollection } from '../collections.ts';

/**
 * @description When a user deletes an account, all notes have been deleted from the notes collection.
 */
export const deleteUser = async (ctx: RouterContext) => {
  const { userId } = ctx.params;

  await notesCollection.deleteMany({
    author: new Bson.ObjectId(userId),
  });

  const deleteCount = await usersCollection.deleteOne({
    _id: new Bson.ObjectId(userId),
  });

  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Can´t find user, failed to delete' };
    return;
  }

  ctx.response.status = 204;
};
