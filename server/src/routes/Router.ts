import { Router } from "express";
import SessionController from "../controllers/sessionController/SessionController";
import UserController from "../controllers/userController/UserController";
const router = Router();

router.post("/register", UserController.create);
router.post("/login", SessionController.create);
export default router;
