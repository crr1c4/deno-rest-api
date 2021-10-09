import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
// Notes
import { getNotes } from './controllers/notes/get.ts';
import { addNote } from './controllers/notes/add.ts';
import { editNote } from './controllers/notes/edit.ts';
import { deleteNote } from './controllers/notes/delete.ts';
// Users
import { registerUser } from './controllers/users/register.ts';
import { loginUser } from './controllers/users/login.ts';
import { deleteUser } from './controllers/users/delete.ts';
import { getUser } from './controllers/users/get.ts';
// Middlewares
import verifyJWT from './middlewares/verifyJWT.ts';
import verifyUser from './middlewares/verifyUser.ts';

const router = new Router();
router
  // * Users
  .post('/signup', registerUser)
  .post('/signin', loginUser)
  .get('/:userId', verifyJWT, getUser)
  .delete('/:userId', verifyJWT, deleteUser)
  // * Notes
  .get('/:username/notes', verifyJWT, verifyUser, getNotes)
  .post('/:username/notes', verifyJWT, verifyUser, addNote)
  .put('/:username/notes/:id', verifyJWT, verifyUser, editNote)
  .delete('/:username/notes/:id', verifyJWT, verifyUser, deleteNote);

export default router;
