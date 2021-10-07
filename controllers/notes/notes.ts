import type { Document } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import db from '../../db.ts';

export interface Note {
  title: string;
  description: string;
  checked: boolean;
  date: Date;
  _id?: Document;
}

export interface RequestBody {
  title: string;
  description: string;
}

export const notesCollection = db.collection<Note>('notes');
