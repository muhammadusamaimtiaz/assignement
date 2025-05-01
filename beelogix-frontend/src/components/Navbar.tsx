import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type NavBarProps = {
  onSignOut: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ onSignOut }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Mini Jira
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/projectsList")}>
            Projects
          </Button>
          <Button color="inherit" onClick={onSignOut}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
