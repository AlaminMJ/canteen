import express from "express";
import router from "../routes";
import middleware from "./middleware";
const app = express();
app.use(middleware);
app.use("/api", router);

export default app;
