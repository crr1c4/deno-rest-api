import { genSalt, hash } from 'bcrypt';
import { usersCollection } from '../collections.ts';
import type { RouterContext } from 'oak';
import type { User } from '../collections.ts';

export const registerUser = async (ctx: RouterContext) => {
  const user: User = await ctx.request.body().value;

  if (!user.password || !user.username) {
    ctx.response.status = 400;
    ctx.response.body = { message: 'username/password not provided' };
  }

  const isUserRegister = await usersCollection.findOne({
    username: user.username,
  });

  if (isUserRegister !== undefined) {
    ctx.response.status = 409;
    ctx.response.body = { message: 'User already in use' };
    return;
  }

  const gSalt = await genSalt(10);
  user.password = await hash(user.password, gSalt);

  const id = await usersCollection.insertOne(user);
  user._id = id;

  ctx.response.status = 201;
  ctx.response.body = {
    message: 'User registed',
    user,
  };
};
