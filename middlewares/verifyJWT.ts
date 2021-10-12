import type { RouterContext, RouterMiddleware } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { verify } from 'https://deno.land/x/djwt@v2.4/mod.ts';
import key from '../helpers/generateKey.ts';

const verifyJWT: RouterMiddleware = async (ctx: RouterContext, next) => {
  const jwt = ctx.request.headers.get('Authorization');

  if (!jwt) {
    ctx.response.status = 403;
    ctx.response.body = { mesage: "No header provided" }
    return;
  }

  if (!jwt.startsWith("Bearer ")) {
    ctx.response.status = 403;
    ctx.response.body = { message: "No bearer provided" }
    return;
  }
  
  const isValid = await verify(jwt.split(" ")[1], key);
  
  if(!isValid) {
    ctx.response.status = 401;
    ctx.response.body = { mesage: "Invalid Token" }
    return;
  }

  await next();
}

export default verifyJWT;