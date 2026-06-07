import { Router } from "express";
import { isLogin, isAdmin } from "../middleware/auth-middleware.js"
import * as controller from '../controllers/order-controller.js'

const router = Router();

router.route("/")
    .post(isLogin, controller.createOrder)
    .get(isLogin, isAdmin, controller.getOrder);


router.route("/myorder")
    .get(isLogin, controller.getMyorderById);


router.route("/:id/status")
    .put(isLogin, isAdmin, controller.updateOrderStatus);

export default router