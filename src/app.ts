import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/Auth/auth.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to SkillBridge Server!");
});

export default app;
