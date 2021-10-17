import { Bson } from 'mongo';
import { usersCollection } from '../collections.ts';
import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';

export const getUser = async (ctx: RouterContext) => {
  const { userId } = ctx.params;
  ctx.response.status = 200;
  ctx.response.body = await usersCollection.findOne({
    _id: new Bson.ObjectId(userId),
  });
};
