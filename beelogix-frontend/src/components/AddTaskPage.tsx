/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import { TaskStatus } from "../types/types";

const statuses = ["todo", "in-progress", "done"];

const AddTaskPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("todo");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { createTask } = useProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !projectId) {
      setError("Please fill all fields.");
      return;
    }

    const newTask = {
      title,
      description,
      status: status as TaskStatus,
      projectId: projectId,
    };

    try {
      await createTask(newTask);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create task.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              {statuses.map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Add Task
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTaskPage;
