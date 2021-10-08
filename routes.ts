import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { getNotes } from './controllers/notes/get.ts';
import { addNote } from './controllers/notes/add.ts';
// import { editNote } from './controllers/notes/edit.ts';
// import { deleteNote } from './controllers/notes/delete.ts';
import { getUsers } from './controllers/users/getAll.ts';
// Users
import { registerUser } from './controllers/users/register.ts';
import { loginUser } from './controllers/users/login.ts';
import { deleteUser } from './controllers/users/delete.ts';
import { getUser } from './controllers/users/get.ts';

const router = new Router();

router
  // * Users
  .get("/users", getUsers) // ! Remove, its only for development >:(
  .post('/signup', registerUser)
  .post('/signin', loginUser)
  .get('/:userId', getUser)
  .delete('/:userId', deleteUser)
  // * Notes
  .get('/:username/notes', getNotes)
  .post('/:username/notes', addNote)
// .put('/notes/:id', editNote)
// .delete('/notes/:id', deleteNote);
// .get("/users", getUsers)

export default router;
