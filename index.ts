import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { config } from 'https://deno.land/x/dotenv@v3.0.0/mod.ts';
import router from './routes/notes.routes.ts';
import printInfo from './middlewares/printInfo.ts';

const { PORT } = config();

const app = new Application();
const port: number = Number(PORT) || 9000;

app.use(printInfo);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server on http://localhost:${port}`);
await app.listen({ port });
