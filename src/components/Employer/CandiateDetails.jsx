import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: 600,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function CandidateDetails({ job }) {
  const [candidates, setCandidates] = useState([]);
  const { BASE_URL } = useAuth();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employer/jobs/${job._id}/applied-candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCandidates(response.data.appliedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleClickOpen = () => {
    fetchCandidates();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        View
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {job?.jobTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {candidates?.map((candidate) => (
            <div key={candidate.userId}>
              <Typography variant="h6">
                {`${candidate.firstname} ${candidate.lastname}`}
              </Typography>
              <Typography>Email: {candidate.email}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
