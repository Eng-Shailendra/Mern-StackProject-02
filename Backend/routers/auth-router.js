import { Router } from "express";
import * as controllers from "../controllers/user-auth-controller.js"

const router = Router();
router.post("/register", controllers.registerUser);
router.post("/email-verify", controllers.emailVarification);
router.post("/login", controllers.loginUser);


export default router;