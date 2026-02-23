import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to SkillBridge Server!");
});

export default app;
