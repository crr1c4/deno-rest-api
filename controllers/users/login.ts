import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { usersCollection } from './user.ts';
import type { User } from './user.ts';

export const login = async (ctx: RouterContext) => {
  const userRequest: User = await ctx.request.body().value;

  const userFound = await usersCollection.findOne({
    username: userRequest.username,
  });

  if (!userFound) {
    ctx.response.status = 403;
    ctx.response.body = { message: 'User doesn´t exist' };
    return;
  }

  if (!await bcrypt.compare(userRequest.password, userFound.password)) {
    ctx.response.status = 403;
    ctx.response.body = { message: 'Incorrect fields' };
  }
  
  ctx.response.status = 200;
  ctx.response.body = userFound;
};
