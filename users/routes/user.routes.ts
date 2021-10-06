import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as UserCtrl from "../controllers/user.controller.ts"


const router = new Router();



router.get("/users", UserCtrl.getUsers)
  .post("/signup", UserCtrl.registerUser)
  .post("/signin", UserCtrl.login);

export default router;