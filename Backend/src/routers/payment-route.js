import { Router } from "express";
import { isLogin, isAdmin } from "../middleware/auth-middleware.js";
import * as controller from "../controllers/payment-controller.js"

const router = Router();

router.post("/order", isLogin, controller.createdOrder);
router.post("/verify", isLogin, controller.paymentVerify);


export default router;