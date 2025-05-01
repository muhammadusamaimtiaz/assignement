/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useProject from "../hooks/useProject";

const AddProjectPage: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { createProject } = useProject();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    try {
      const response = await createProject({
        name: projectName,
        description,
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to create project. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 3,
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Project
        </Button>
      </form>

      <Snackbar
        open={success}
        message="Project created successfully!"
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      />
      <Snackbar
        open={!!error}
        message={error || ""}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      />
    </Box>
  );
};

export default AddProjectPage;
