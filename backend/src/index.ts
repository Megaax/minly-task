/* eslint-disable import/first */
require("dotenv").config();

import * as express from "express";
import { Application, Request, Response, NextFunction } from "express";
import * as cors from "cors";
import mongoose from "mongoose";
import * as http from "http";
import * as socketio from "socket.io";
import httpStatusText from "./utils/httpStatusText";

const app: Application = express();

app.use(express.json());
app.use(cors());

const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server);

const url: string | undefined = process.env.MONGO_URL;
if (!url) {
  console.error("MongoDB URL not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

import usersRoutes from "./routes/users.route";
import contentRoutes from "./routes/content.route";

app.use("/users", usersRoutes);
app.use("/content", contentRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({ status: httpStatusText.ERROR, message: "Resource not available" });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const PORT: number | string = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
