import { MongoClient } from 'mongo';
import { config } from 'dotenv';

const { MONGO_URI, DB_NAME } = config();
const client = new MongoClient();

await client.connect(MONGO_URI);

const db = client.database(DB_NAME);
export default db;
