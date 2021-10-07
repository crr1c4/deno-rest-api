import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { getNotes } from '../controllers/notes/get.ts';
import { addNote } from '../controllers/notes/add.ts';
import { editNote } from '../controllers/notes/edit.ts';
import { deleteNote } from '../controllers/notes/delete.ts';

const router = new Router();

router
  .get('/notes', getNotes)
  .post('/notes', addNote)
  .put('/notes/:id', editNote)
  .delete('/notes/:id', deleteNote);

export default router;
