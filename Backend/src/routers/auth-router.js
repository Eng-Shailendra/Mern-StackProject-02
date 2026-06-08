import { Router } from "express";
import * as controllers from "../controllers/user-auth-controller.js"
import { isLogin, isAdmin } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/register", controllers.registerUser);
router.post("/verify", controllers.emailVerification);
router.post("/login", controllers.loginUser);
router.post("/forgot-password", controllers.forgotPassword);
router.post("/verify-otp/:email", controllers.verifyOtp);
router.post("/update-password/:email", controllers.updatePassword);
router.get("/logout", isLogin, controllers.LogoutUser);


export default router;