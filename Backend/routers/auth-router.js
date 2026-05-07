import { Router } from "express";
import * as controllers from "../controllers/user-auth-controller.js"

const router = Router();
router.post("/register", controllers.regesterUser);
// router.post("login", controllers.loginUser);

export default router;