import express, { NextFunction, Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/Router";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
dotenv.config({ path: "./src/.env" });

mongoose
  .connect(process.env.DB_HOST!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));
// .finally(() => mongoose.connection.close());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).send({ message: err.message });
  }

  return res.status(500).send({
    status: "error",
    message: `Internal server error - ${err}`,
  });
});

export default app;
