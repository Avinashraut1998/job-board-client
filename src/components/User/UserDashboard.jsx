import NavBar from "../NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import UserDrawer from "./UserDrawer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const UserDashboard = () => {
  const { setUser, BASE_URL } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(` ${BASE_URL}/user/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.userData;
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);
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
