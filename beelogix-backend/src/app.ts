import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.route";
import { authenticate } from "./middleware/auth";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", authenticate, projectRoutes);
app.use("/api/tasks", authenticate, taskRoutes);

export default app;
