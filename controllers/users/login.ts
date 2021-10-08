import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { usersCollection } from '../collections.ts';
import type { User } from '../collections.ts';

export const loginUser = async (ctx: RouterContext) => {
  const userRequest: User = await ctx.request.body().value;

  const userFound = await usersCollection.findOne({
    username: userRequest.username,
  });

  if (!userFound) {
    ctx.response.status = 403;
    ctx.response.body = { message: 'User doesn´t exist' };
    return;
  }

  const isPasswordValid = await bcrypt.compare(userRequest.password, userFound.password);

  console.log(isPasswordValid);
  
  if (!isPasswordValid) {
    ctx.response.status = 403;
    ctx.response.body = { message: 'Incorrect fields' };
    return;
  }
  
  ctx.response.status = 200;
  ctx.response.body = userFound;
};
