import { Router } from "express";
import authRouter from "./auth";

const router = Router();
const defaultRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
];

// all router
defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});
export default router;
