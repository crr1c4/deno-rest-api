import { MongoClient } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { config } from 'https://deno.land/x/dotenv@v3.0.0/mod.ts';

const { MONGO_URI, DB_NAME } = config();
const client = new MongoClient();

await client.connect(MONGO_URI);

const db = client.database(DB_NAME);
export default db;
