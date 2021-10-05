import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import * as Ctrl from "../controllers/notesController.ts";
import verifyBody from "../middlewares/verifyBody.ts";

const router = new Router();

router
  .get("/notes", Ctrl.getNote)
  .post("/notes", verifyBody, Ctrl.addNote)
  .put("/notes/:id", verifyBody,Ctrl.editNote)
  .delete("/notes/:id", Ctrl.deleteNote)

export default router;