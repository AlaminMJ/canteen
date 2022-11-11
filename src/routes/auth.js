import { Router } from "express";
import { isNamedExportBindings } from "typescript";
import { authController } from "../controllers";
import isLogin from "../middlewares/isLogin";
import { User } from "../models";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/varifyemail/:token", authController.validateEmail);
router.get("/refresh", authController.refreshToken);
router.get("/me", isLogin(), async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user.length === 0) {
    return next("no user found");
  }
  res.json({ user });
});

export default router;
