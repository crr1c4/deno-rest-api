import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
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
