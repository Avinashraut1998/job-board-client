import { Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import AdminDrawer from "../components/Admin/AdminDrawer";

const AdminDashboard = () => {
  return (
    <>
      <Box>
        <NavBar />
        <Box sx={{ display: "flex", bgcolor: "#eee" }}>
          <CssBaseline />

          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <Toolbar />
            <AdminDrawer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
