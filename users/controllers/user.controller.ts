import type { Context } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts';

interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export const getUsers = (ctx: Context) => {
  ctx.response.body = {
    users,
  };
};

export const registerUser = async (ctx: Context) => {
  try {
    const user: User = await ctx.request.body().value;
    const genSalt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, genSalt);

    users.forEach((u) => {
      if (u.username === user.username) {
        console.log('Passed here!!');
        throw { status: 404, body: 'Username already in use' };
      }
    });

    users.push(user);
    console.log(users);

    user;
    ctx.response.body = {
      message: 'User registed',
      username: user.username,
    };
  } catch (err) {
    ctx.response.status = err.status;
    ctx.response.body = { message: err.body };
  }
};

export const login = async (ctx: Context) => {
  try {
    const userRequest: User = await ctx.request.body().value;

    let isUserValid = false;

    

    for (const user of users) {
      if (user['username'] === userRequest.username) {
        const isPasswordValid = await bcrypt.compare(
          userRequest['password'],
          user['password']
        );

        if (isPasswordValid) {
          ctx.response.body = {
            message: 'login',
            username: userRequest['username'],
          };
        } else {
          throw { status: 404, body: 'Incorrect password' };
        }
      } else {
        throw { status: 404, body: 'Incorrect username' };
      }
    }
  } catch (err) {
    ctx.response.status = err.status;
    ctx.response.body = { message: err.body };
  }
};
