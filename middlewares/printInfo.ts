import { Middleware, Context } from 'oak';
import { bold, bgRgb24 } from 'colors';

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
