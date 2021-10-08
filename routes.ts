import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
// Notes
import { getNotes } from './controllers/notes/get.ts';
import { addNote } from './controllers/notes/add.ts';
import { editNote } from './controllers/notes/edit.ts';
import { deleteNote } from './controllers/notes/delete.ts';
// Users
import { getUsers } from './controllers/users/getAll.ts'; // ! DELETE THIS
import { registerUser } from './controllers/users/register.ts';
import { loginUser } from './controllers/users/login.ts';
import { deleteUser } from './controllers/users/delete.ts';
import { getUser } from './controllers/users/get.ts';
// Middlewares
import verifyJWT from './middlewares/verifyJWT.ts';

const router = new Router();
// TODO: Create middlewares
// TODO: JWT
router
  // * Users
  .get('/users', getUsers) // ! Remove, its only for development >:(
  .post('/signup', registerUser)
  .post('/signin', loginUser)
  .get('/:userId', verifyJWT, getUser)
  .delete('/:userId', verifyJWT, deleteUser)
  // * Notes
  .get('/:username/notes', verifyJWT, getNotes)
  .post('/:username/notes', verifyJWT, addNote)
  .put('/:username/notes/:id', verifyJWT, editNote)
  .delete('/:username/notes/:id', verifyJWT, deleteNote);

export default router;
