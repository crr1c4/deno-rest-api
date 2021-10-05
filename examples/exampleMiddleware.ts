import { Application, Router, Middleware } from 'https://deno.land/x/oak@v9.0.1/mod.ts';

const app = new Application();
const router = new Router();
const port = 10000;

// app.use(async (ctx, next) => {
//   console.log("Middleware");
//   await next();
//   console.log("Other log");
// })

const md: Middleware = (ctx) => {
  console.log("middle ware function");
  console.log(ctx.request.hasBody)
}

router.get("/", md, (ctx) => {
  console.log("petition");
  
  ctx.response.body = "Hello world"
})

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server on http://localhost:${port}`);
await app.listen({ port });
