import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import EmployerDrawer from "../components/Employer/EmployerDrawer";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const EmployerDashboard = () => {
  const { setJobs, setUser, BASE_URL, setJobnotification } = useAuth();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(`${BASE_URL}/employer/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchjobNotification = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          `${BASE_URL}/employer/jobs-notification`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobnotification(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(` ${BASE_URL}/employer/user`, {
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
    fetchJobs();
    fetchUserData();
    fetchjobNotification();
  }, []);

  return (
    <>
      <Box>
        <NavBar />
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
