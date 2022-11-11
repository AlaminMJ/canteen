import { Router } from "express";
import { authController } from "../controllers";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/varifyemail/:token", authController.validateEmail);
router.get("/refresh", authController.refreshToken);

export default router;
