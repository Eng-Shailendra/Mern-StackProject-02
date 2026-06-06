import { Router } from "express";
import { isLogin, isAdmin } from '../middleware/auth-middleware.js'
import * as controller from "../controllers/product-controller.js"
import multer from "multer"
const uploade = multer({ dest: "uploads/" })


const router = Router();

router.route("/")
    .get(controller.getProducts)
    .post(isLogin, isAdmin, uploade.single("image"), controller.createProduct);

router.route("/:id")
    .get(controller.getProductById)
    .put(isLogin, isAdmin, controller.updateProductById)
    .delete(isLogin, isAdmin, controller.deleteProductById)

export default router