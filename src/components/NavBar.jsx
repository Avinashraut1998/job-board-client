import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://marquery.com/wp-content/uploads/2024/01/M-Logo.png"
          alt=""
          style={{ maxWidth: "120px", maxHeight: "60px" }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{user?.username}</Typography>
          <Button
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
            variant="outlined"
            color="inherit"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
