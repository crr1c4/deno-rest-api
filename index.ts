import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import router from './routes/router.ts';
import printInfo from "./middlewares/printInfo.ts"

const app = new Application();
const port = 9000;

app.use(printInfo);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server on http://localhost:${port}`);
await app.listen({ port });
