import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import CreateJobDialog from "./CreateJobDialog";
import axios from "axios";
import DeleteJobDialog from "./DeleteJobDialog";
import ViewJobDialog from "./ViewJobDialog";
import UpdateJobDialog from "./UpdateJobDialog";

const EmployerJobsTable = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "http://localhost:8080/employer/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateJobs = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleJobDeletion = (deletedJobId) => {
    const updatedJobs = jobs.filter((job) => job._id !== deletedJobId);
    setJobs(updatedJobs);
    fetchJobs();
  };

  const handleJobUpdate = (updatedJob) => {
    const updatedJobIndex = jobs.findIndex((job) => job._id === updatedJob._id);

    if (updatedJobIndex !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs[updatedJobIndex] = updatedJob;
      setJobs(updatedJobs);
    }
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          All Jobs
        </Typography>
        <CreateJobDialog updateJobs={updateJobs} />
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
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell component="th" scope="row">
                    {job.jobTitle}
                  </TableCell>
                  <TableCell align="left">{job.vacancies}</TableCell>
                  <TableCell align="left" sx={{ display: "flex", gap: 1 }}>
                    <ViewJobDialog jobId={job._id} job={job} />
                    <UpdateJobDialog
                      jobId={job._id}
                      job={job}
                      onUpdate={handleJobUpdate}
                    />
                    <DeleteJobDialog
                      jobId={job._id}
                      updateJobs={handleJobDeletion}
                    />
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
  );
};

export default EmployerJobsTable;
