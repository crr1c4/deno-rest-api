import type { RouterContext } from 'oak';
import { Bson } from 'mongo';
import { notesCollection } from '../collections.ts';
import type { User } from '../collections.ts';

export const getNotes = async (ctx: RouterContext) => {
  const user: User = ctx.state.user;
  ctx.response.body = 200;
  ctx.response.body = await notesCollection
    .find({
      author: new Bson.ObjectId(user._id),
    })
    .toArray();
};
