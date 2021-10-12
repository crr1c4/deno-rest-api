import { compare } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';
import { create } from 'https://deno.land/x/djwt@v2.4/mod.ts';
import { usersCollection } from '../collections.ts';
import key from '../../helpers/generateKey.ts';
import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
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

  const isPasswordValid = await compare(
    userRequest.password,
    userFound.password
  );

  if (!isPasswordValid) {
    ctx.response.status = 403;
    ctx.response.body = { message: 'Incorrect password' };
    return;
  }

  const jwt = await create(
    { alg: 'HS512', typ: 'JWT' },
    { id: userFound._id },
    key
  );

  ctx.response.status = 200;
  ctx.response.body = {
    username: userFound.username,
    token: jwt,
  };
};
