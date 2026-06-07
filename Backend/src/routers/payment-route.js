import { Router } from "express";
import * as controller from "../controllers/payment-controller.js"

const router = Router();

router.post("/order", controller.createdOrder);
router.post("/verify", controller.paymentVerify);


export default router;