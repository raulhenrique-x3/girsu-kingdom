import { Router } from "express";
import LastReportsController from "../controllers/lastReportsController/LastReportsController";
import SessionController from "../controllers/sessionController/SessionController";
import UserController from "../controllers/userController/UserController";
import { verifyToken } from "../middleware/login";
const router = Router();

router.post("/register", UserController.create);
router.post("/login", SessionController.create);
router.post("/reports", verifyToken, LastReportsController.create);
export default router;
