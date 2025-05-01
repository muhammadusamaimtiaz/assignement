import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
} from "@mui/material";
import useDashboard from "../hooks/useDashboard";
import { Project, Task } from "../types/types";
import { useNavigate } from "react-router-dom";

const statuses: Array<Task["status"]> = ["todo", "in-progress", "done"];

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusChange, setStatusChange] = useState<Task["status"]>("todo");

  const navigate = useNavigate();

  const { getAllProjects, getAllProjectTasks, updateTaskStatus } =
    useDashboard();

  useEffect(() => {
    const getProjects = async () => {
      const projects = await getAllProjects();
      setProjects(projects);
    };
    getProjects();
  }, []);

  const handleProjectChange = async (event: { target: { value: string } }) => {
    setSelectedProject(event.target.value);
    const tasks = await getAllProjectTasks(event.target.value);
    setTasks(tasks);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setStatusChange(task.status);
  };

  const handleStatusUpdate = async () => {
    if (selectedTask) {
      await updateTaskStatus(selectedTask._id, statusChange);
      const updatedTasks = await getAllProjectTasks(selectedProject!);
      setTasks(updatedTasks);
      setSelectedTask(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 4,
        height: "100vh",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            displayEmpty
            value={selectedProject || ""}
            onChange={handleProjectChange}
          >
            <MenuItem disabled value="">
              Select Project
            </MenuItem>
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
          <Button
            onClick={() => {
              navigate("/project");
            }}
          >
            Add Project
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {statuses.map((status) => (
          <Box
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              const taskId = e.dataTransfer.getData("taskId");
              await updateTaskStatus(taskId, status);
              const updatedTasks = await getAllProjectTasks(selectedProject!);
              setTasks(updatedTasks);
            }}
            sx={{
              width: "30%",
              bgcolor: "#f5f5f5",
              p: 2,
              minHeight: "80vh",
              borderRadius: 1,
              boxShadow: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {status}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {tasks
                .filter(
                  (task) =>
                    task.status === status && task.projectId === selectedProject
                )
                .map((task) => (
                  <Card
                    key={task._id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task._id);
                    }}
                    onClick={() => handleTaskClick(task)}
                    sx={{ cursor: "grab" }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {task.title}
                      </Typography>
                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{selectedTask?.title}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedTask?.description}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusChange}
              label="Status"
              onChange={(e) =>
                setStatusChange(e.target.value as Task["status"])
              }
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTask(null)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
