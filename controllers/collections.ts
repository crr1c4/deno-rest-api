import type { Document } from 'mongo';
import db from '../db.ts';

export interface User {
  username: string;
  password: string;
  _id?: Document;
}

export interface Note {
  title: string;
  description: string;
  checked: boolean;
  author: Document;
  date: Date;
  _id?: Document;
}

export interface RequestBody {
  title: string;
  description: string;
}

export const notesCollection = db.collection<Note>('notes');
export const usersCollection = db.collection<User>('users');