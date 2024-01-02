import React from "react";
import NavBar from "../components/NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import EmployerDrawer from "../components/EmployerDrawer";
import { Outlet } from "react-router-dom";

const EmployerDashboard = ({ user }) => {
  return (
    <>
      <Box>
        <NavBar user={user} />
        <Box sx={{ display: "flex", bgcolor: "#eee" }}>
          <CssBaseline />
          <EmployerDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmployerDashboard;
