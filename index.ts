import { Application } from 'oak';
import { config } from 'dotenv';
import { oakCors } from 'cors';
import router from './routes.ts';

const { PORT } = config();

const app = new Application();
const port: number = Number(PORT) || 9000;

app.use(
  oakCors({
    origin: /^.+localhost:(3000|5500)$/,
    optionsSuccessStatus: 200,
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server on http://localhost:${port}`);
await app.listen({ port });
