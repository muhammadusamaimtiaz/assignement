import express from "express";
import Project from "../models/Projects";
import { AuthRequest } from "../middleware/auth";

const router = express.Router();

router.post("/", async (req: AuthRequest, res) => {
  const project = new Project({ ...req.body, createdBy: req?.user?.id });
  await project.save();
  res.status(201).json(project);
});

router.get("/", async (req: AuthRequest, res) => {
  const projects = await Project.find({ createdBy: req?.user?.id });
  res.json(projects);
});

export default router;
