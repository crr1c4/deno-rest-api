import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import * as Ctrl from "../controllers/notesController.ts";

const router = new Router();

router
  .get("/notes", Ctrl.getNote)
  .post("/notes", Ctrl.addNote)
  .put("/notes/:id", Ctrl.editNote)
  .delete("/notes/:id", Ctrl.deleteNote)

export default router;