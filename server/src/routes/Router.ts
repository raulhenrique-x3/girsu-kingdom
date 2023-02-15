import { Router } from "express";
import UserController from "../controllers/userController/UserController";
const router = Router();

router.post("/register", UserController.create);

export default router;
