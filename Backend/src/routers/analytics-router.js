import { Router } from "express";
import { isLogin, isAdmin } from '../middleware/auth-middleware.js'
import * as controller from "../controllers/analyics-controller.js"

const router = Router();

router.get("/states", isLogin, isAdmin, controller.getAdminStates);



export default router;