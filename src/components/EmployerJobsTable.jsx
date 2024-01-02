import React from "react";
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

const EmployerJobsTable = () => {
  const [jobs, setJobs] = React.useState([]);

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
        console.log(response.data);
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const updateJobs = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          All Jobs{" "}
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
            {jobs?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell component="th" scope="row">
                  {job?.jobTitle}
                </TableCell>
                <TableCell align="left">{job?.vacancies}</TableCell>
                <TableCell align="left"> {/* Add actions here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployerJobsTable;
