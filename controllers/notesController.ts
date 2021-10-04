import { red, bold } from 'https://deno.land/std@0.109.0/fmt/colors.ts';
import type {
  RouteParams,
  Response,
  Request,
} from 'https://deno.land/x/oak@v9.0.1/mod.ts';

interface Note {
  title: string;
  description: string;
  checked: boolean;
  date: Date;
  id: string;
}

interface ErrorType {
  message: string;
  status: number;
}

const handleError = (message: string, status: number): ErrorType => {
  console.error(red(`ERROR: ${bold(message)}`));
  return { message, status };
};

let notes: Note[] = [];

export const getNote = ({ response }: { response: Response }) => {
  response.status = 200;
  response.body = {
    message: 'Success',
    notes,
  };
};

export const addNote = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  try {
    const { title, description }: { title: string; description: string } =
      await request.body().value;

    if (title === undefined) throw handleError('Title was undefined.', 400);
    if (title === '') throw handleError('Title was empty.', 400);
    if (description === undefined)
      throw handleError('Description was undefined.', 400);
    if (description === '') throw handleError('Description was empty.', 400);

    const note: Note = {
      title,
      description,
      checked: false,
      date: new Date(),
      id: globalThis.crypto.randomUUID(),
    };

    notes.push(note);

    response.status = 201;
    response.body = {
      message: 'Note created',
      note,
    };
  } catch (err) {
    response.status = err.status;
    response.body = {
      message: err.message,
    };
  }
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
  try {
    if (params.id === undefined) throw handleError('Title was undefined.', 400);
    if (params.id === '') throw handleError('Title was empty.', 400);
    if (!notes.find((n) => n.id === params.id))
      throw handleError('Not found', 404);

    const editedNote: Note = {
      ...notes.find((nUpdated) => nUpdated.id === params.id),
      ...(await request.body().value),
    };

    notes = notes.filter((n) => n.id !== params.id).concat(editedNote);

    response.status = 201;
    response.body = {
      message: 'Updated note!',
      note: editedNote,
    };
  } catch (err) {
    response.status = err.status;
    response.body = {
      message: err.message,
    };
  }
};

export const deleteNote = ({
  params,
  response,
}: {
  params: RouteParams;
  response: Response;
}) => {
  try {
    if (params.id === undefined) throw handleError('Title was undefined.', 400);
    if (params.id === '') throw handleError('Title was empty.', 400);
    if (!notes.find((n) => n.id === params.id))
      throw handleError('Not found', 404);

    notes = notes.filter((n) => n.id !== params.id);
    response.status = 200;
    response.body = {
      message: 'Removed note!',
    };
  } catch (err) {
    response.status = err.status;
    response.body = {
      message: err.message,
    };
  }
};
