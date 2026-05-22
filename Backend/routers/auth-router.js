import { Router } from "express";
import * as controllers from "../controllers/user-auth-controller.js"

const router = Router();
router.post("/register", controllers.registerUser);
router.post("/email-verify", controllers.emailVarification);
router.post("/login", controllers.loginUser);
router.post("/forgot-password", controllers.forgotPassword);
router.post("/verify-otp/:email", controllers.verifyOtp);
router.post("/update-password/:email", controllers.updatePassword);


export default router;