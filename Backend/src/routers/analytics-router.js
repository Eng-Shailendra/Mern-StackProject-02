import { Router } from "express";
import * as controller from "../controllers/analyics-controller.js"

const router = Router();

router.route("/")
    .get()


export default router;