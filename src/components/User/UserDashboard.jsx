import NavBar from "../NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import UserDrawer from "./UserDrawer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const UserDashboard = () => {
  const { setUser, BASE_URL, user, setJobnotification } = useAuth();

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
          console.log(data);
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchNotifydata = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            ` ${BASE_URL}/user/get-jobs-notification`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data.jobs;
          console.log(data);
          setJobnotification(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
    fetchNotifydata();
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
            {user?.isVerified == true ? (
              <Outlet />
            ) : (
              <div> User account is not verified yet</div>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDashboard;
