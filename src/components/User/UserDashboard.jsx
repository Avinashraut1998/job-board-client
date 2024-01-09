import React from "react";
import NavBar from "../NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import UserDrawer from "./UserDrawer";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <>
      <Box>
        <NavBar />
        <Box sx={{ display: "flex", bgcolor: "#eee" }}>
          <CssBaseline />
          <UserDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDashboard;
