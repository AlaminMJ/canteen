import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
export default [express.json(), cors(), morgan("dev"), helmet()];
