import express from "express";
import { errorHandler } from "../middlewares";
import router from "../routes";
import middleware from "./middleware";
const app = express();
app.use(middleware);
app.use("/api", router);
app.use(errorHandler);
export default app;
