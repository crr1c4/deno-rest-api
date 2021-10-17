import type { RouterMiddleware, RouterContext } from 'oak';
import { usersCollection } from '../controllers/collections.ts';

const verifyUser: RouterMiddleware = async (ctx: RouterContext, next) => {
  const { username } = ctx.params;
  const user = await usersCollection.findOne({ username });

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: 'User doesn´t exist',
    };
    return;
  }

  ctx.state.user = user;
  await next();
};

export default verifyUser;
