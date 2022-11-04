import app from "./src/app";
import { PORT } from "./src/config";
import http from "http";
import connectDb from "./src/db";
const server = http.createServer(app);
const port = PORT || 5000;
connectDb();
server.listen(port, () => {
  console.log(`Server in runing on port ${port}`);
});
