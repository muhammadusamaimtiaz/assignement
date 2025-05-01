import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import { Project } from "../types/types";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getAllProjects } = useDashboard();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load projects.");
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="h4" gutterBottom>
        Projects List
      </Typography>

      {projects.length === 0 ? (
        <Typography>No projects available.</Typography>
      ) : (
        projects.map((project) => (
          <Card key={project._id} sx={{ boxShadow: 2 }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                {project.name}
              </Typography>
              <Typography variant="body2">{project.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/add-task/${project?._id}`)}
              >
                Add Tasks
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ProjectList;
