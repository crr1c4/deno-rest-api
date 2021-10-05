import { Middleware, Context } from 'https://deno.land/x/oak@v9.0.1/mod.ts';

const verifyData: Middleware = async (ctx: Context, next) => {
  console.log(ctx.request.hasBody);
  await next();
  console.log("After next()");
  
};

export default verifyData;
