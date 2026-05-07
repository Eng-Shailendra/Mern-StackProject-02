import router from "Router";
import * as controllers from "../controllers/user-auth-controller.js"

router.post("/register", controllers.regesterUser);
router.post("login", controllers.loginUser);

export default router;