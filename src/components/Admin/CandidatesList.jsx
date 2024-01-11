import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function CandidateDetails() {
  const [candidateList, setCandidateList] = useState([]);
  const { BASE_URL } = useAuth();

  const token = localStorage.getItem("token");

  const updateStatus = async (userId, isVerified) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/update-user`,
        { userId, isVerified },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCandidateList((prevCandidateList) =>
        prevCandidateList.map((candidate) =>
          candidate._id === userId
            ? { ...candidate, isVerified: isVerified }
            : candidate
        )
      );
    } catch (error) {
      console.error("Error updating  status:", error);
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/get-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCandidateList(response.data.users);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <>
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Candidate List
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {candidateList.length > 0 ? (
                candidateList.map((candidate) => (
                  <TableRow key={candidate._id}>
                    <TableCell component="th" scope="row">
                      {candidate.firstname}
                    </TableCell>
                    <TableCell align="left"> {candidate.email}</TableCell>
                    <TableCell align="left">
                      {candidate.isVerified.toString()}
                    </TableCell>
                    <TableCell align="left" sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => updateStatus(candidate._id, true)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => updateStatus(candidate._id, false)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No Candidate is Registered
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
