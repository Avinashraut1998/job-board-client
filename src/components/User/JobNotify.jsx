import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import ViewJobDialog from "../Employer/ViewJobDialog";
import ApplyJobDialog from "./ApplyJobDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useAuth } from "../../context/AuthContext";

const JobNotify = () => {
  const { jobnotification, setJobnotification } = useAuth();
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleApplySuccess = (appliedJobId) => {
    // Update the jobs list to mark the applied job as applied
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === appliedJobId ? { ...job, isApplied: true } : job
      )
    );
  };

  return (
    <>
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            All Jobs
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Vacancies
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobnotification.length > 0 ? (
                jobnotification.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell component="th" scope="row">
                      {job.jobTitle}
                    </TableCell>
                    <TableCell align="left">{job.vacancies}</TableCell>
                    <TableCell align="left">{job.location}</TableCell>
                    <TableCell align="left" sx={{ display: "flex", gap: 1 }}>
                      <ViewJobDialog jobId={job._id} job={job} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No jobs available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* handleClickAlert */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Applied Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobNotify;
