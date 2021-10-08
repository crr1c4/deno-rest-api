import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { usersCollection } from "../collections.ts" 

export const getUsers = async (ctx: RouterContext) => {
  ctx.response.body = 200;
  ctx.response.body = await usersCollection.find().toArray();
};
