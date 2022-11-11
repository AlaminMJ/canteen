import { Router } from "express";
import { authController } from "../controllers";
import isLogin from "../middlewares/isLogin";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/test", isLogin, (req, res) => {
  res.json({ msg: "ok your are accessAble", user: req.user });
});
export default router;
