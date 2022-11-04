import { Router } from "express";
import { authController } from "../controllers";

const router = Router();
router.get("/", authController.getUser);
export default router;
