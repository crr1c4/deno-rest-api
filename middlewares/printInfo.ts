import { Middleware, Context } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import {
  bold,
  bgRgb24,
} from 'https://deno.land/std@0.109.0/fmt/colors.ts';

const printInfo: Middleware = async (ctx: Context, next) => {
  const {
    method,
    hasBody,
    url: { pathname },
  } = ctx.request;
  console.log(
    `${bgRgb24(` ${bold(method)} `, { r: 100, g: 0, b: 100 })} ${bold(
      pathname
    )} hasBody:${bold(hasBody.toString())}`
  );
  await next();
};

export default printInfo;
