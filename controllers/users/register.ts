import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { usersCollection } from './user.ts';
import type { User } from './user.ts';

export const registerUser = async (ctx: RouterContext) => {
  const user: User = await ctx.request.body().value;
  const genSalt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, genSalt);

  const isUserRegister = await usersCollection.findOne({
    username: user.username,
  });

  if (isUserRegister !== undefined) {
    ctx.response.status = 409;
    ctx.response.body = { message: 'User already exist' };
    return;
  }

  const id = await usersCollection.insertOne(user);
  user._id = id;

  ctx.response.status = 201;
  ctx.response.body = {
    user,
    message: 'User registed',
  };
};
