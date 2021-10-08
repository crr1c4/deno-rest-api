import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { usersCollection } from "../collections.ts"

export const getUser = async (ctx: RouterContext) => {
  const { userId } = ctx.params;
  ctx.response.status = 200;
  ctx.response.body = await usersCollection.findOne({_id: new Bson.ObjectId(userId)})
}