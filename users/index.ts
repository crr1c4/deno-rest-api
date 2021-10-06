import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import router from "./routes/user.routes.ts";

const app = new Application();
const port = 8000;

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`http://localhost:${port}`);
await app.listen({ port });
