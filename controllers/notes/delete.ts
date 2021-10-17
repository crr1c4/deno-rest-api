import type { RouterContext } from 'oak';
import { Bson } from 'mongo';
import { notesCollection, User } from '../collections.ts';

export const deleteNote = async (ctx: RouterContext) => {
  const { id } = ctx.params;
  const user: User = ctx.state.user;

  const deleteCount = await notesCollection.deleteOne({
    _id: new Bson.ObjectId(id),
    author: new Bson.ObjectId(user?._id),
  });

  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note doesn´t exist' };
    return;
  }

  ctx.response.status = 204;
};
