import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import {
  addNote,
  deleteNote,
  editNote,
  getNote,
} from '../controllers/notesController.ts';

const router = new Router();

router
  .get('/notes', getNote)
  .post('/notes', addNote)
  .put('/notes/:id', editNote)
  .delete('/notes/:id', deleteNote);

export default router;
