import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { config } from 'https://deno.land/x/dotenv@v3.0.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import router from './routes.ts';

const { PORT } = config();

const app = new Application();
const port: number = Number(PORT) || 9000;

app.use(
  oakCors({
    origin: /^.+localhost:(1234|3000)$/,
    optionsSuccessStatus: 200,
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server on http://localhost:${port}`);
await app.listen({ port });
