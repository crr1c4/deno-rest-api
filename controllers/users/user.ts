import type { Document } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import db from '../../db.ts';

export interface User {
  username: string;
  password: string;
  _id?: Document;
}

export const usersCollection = db.collection<User>('users');
