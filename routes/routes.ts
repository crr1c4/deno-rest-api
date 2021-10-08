import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
// import { getNotes } from '../controllers/notes/get.ts';
// import { addNote } from '../controllers/notes/add.ts';
// import { editNote } from '../controllers/notes/edit.ts';
// import { deleteNote } from '../controllers/notes/delete.ts';
import { registerUser } from "../controllers/users/register.ts"
import { getUsers } from "../controllers/users/getAll.ts"
import { deleteUser } from "../controllers/users/delete.ts"
import { getUser } from "../controllers/users/get.ts"
import { login } from "../controllers/users/login.ts"
// import {  } from "../controllers/users/login.ts"

const router = new Router();

router
  .get("/users", getUsers)
  .post("/signin", login)
  .get("/:id", getUser)
  .post("/signup", registerUser)
  .delete("/:id", deleteUser)
  // .get('/notes', getNotes)
  // .post('/notes', addNote)
  // .put('/notes/:id', editNote)
  // .delete('/notes/:id', deleteNote);

export default router;
