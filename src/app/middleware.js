import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// app middleware
export default [
  express.json(),
  express.urlencoded({ extended: false }),
  cors(),
  morgan("tiny"),
  helmet(),
];
