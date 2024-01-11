import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import CandidateDetails from "./CandiateDetails";

const AppliedCandidateList = () => {
  const { jobs } = useAuth();

  return (
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
                Applications
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
                  <TableCell align="left">
                    <CandidateDetails job={job} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
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

export default AppliedCandidateList;
