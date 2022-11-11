import dotenv from "dotenv";
dotenv.config();

export const { PORT, DB_URL, JWT_SECRET, DEBUG_MODE } = process.env;
