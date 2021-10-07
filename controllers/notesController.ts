import { Document, Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import db from '../db.ts';
import type {
  RouteParams,
  Response,
  Request,
} from 'https://deno.land/x/oak@v9.0.1/mod.ts';

interface NoteInput {
  title: string;
  description: string;
}

interface Note {
  title: string;
  description: string;
  checked: boolean;
  date: Date;
  _id?: Document;
}

const notesCollection = db.collection<Note>('notes');

export const getNote = async ({ response }: { response: Response }) => {
  response.status = 200;
  response.body = await notesCollection.find().toArray();
};

export const addNote = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const { title, description }: NoteInput = await request.body().value;

  const note: Note = {
    title,
    description,
    checked: false,
    date: new Date(),
  };

  const id = await notesCollection.insertOne(note);
  note._id = id;

  response.status = 201;
  response.body = {
    message: 'Note created',
    note,
  };
};

export const editNote = async ({
  request,
  response,
  params,
}: {
  request: Request;
  response: Response;
  params: RouteParams;
}) => {
  const { title, description }: NoteInput = await request.body().value;
  const { id } = params;
  try {
    const { modifiedCount } = await notesCollection.updateOne(
      { _id: new Bson.ObjectId(id) },
      {
        $set: {
          title,
          description,
        },
      }
    );

    if (!modifiedCount) {
      response.status = 404;
      response.body = { message: 'Note doesn´t exist' };
    }

    response.status = 201;
    response.body = {
      message: 'Updated note!',
    };
  } catch (err) {
    response.status = 500;
    response.body = { message: 'Unknown error' };
    console.error(err);
  } finally {
    const note = await notesCollection.findOne({ _id: new Bson.ObjectId(id) });
    response.body = {
      message: 'Note updated!',
      note,
    };
  }
};

export const deleteNote = async ({
  params,
  response,
}: {
  params: RouteParams;
  response: Response;
}) => {
  const { id } = params;
  const deleteCount = await notesCollection.deleteOne({
    _id: new Bson.ObjectId(id),
  });

  if (!deleteCount) {
    response.status = 404;
    response.body = { message: 'Note doesn´t exist' };
    return;
  }

  response.status = 204;
};
