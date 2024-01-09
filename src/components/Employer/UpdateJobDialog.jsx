import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UpdateJobDialog({ jobId, job, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: job?.jobTitle || "",
    desc: job?.desc || "",
    vacancies: job?.vacancies || "",
    location: job?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.put(
          `http://localhost:8080/employer/jobs/${jobId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle successful update (e.g., display a success message)
        console.log("Job updated successfully:", response.data);
        onUpdate(response.data.job);
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    handleUpdate();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Update
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
          <Typography variant="h6" gutterBottom>
            Update Job
          </Typography>
          <Divider />

          <Box mt={2}>
            <TextField
              label="Title"
              name="jobTitle"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="desc"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.desc}
              onChange={handleChange}
            />

            <TextField
              label="Vacancies"
              name="vacancies"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.vacancies}
              onChange={handleChange}
            />

            <TextField
              label="Location"
              name="location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={handleClose}
          >
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
