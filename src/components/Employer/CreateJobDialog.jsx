import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CreateJobDialog({ updateJobs }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    vacancies: 1,
    location: "",
    desc: "",
  });
  const { BASE_URL } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === "number" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/employer/create-job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateJobs(response.data.job);

      handleClose();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Job
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Job
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="jobTitle"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                autoFocus
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="vacancies"
                required
                fullWidth
                id="vacancies"
                label="Vacancies"
                type="number"
                inputProps={{
                  min: 0,
                }}
                value={formData.vacancies}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="location"
                required
                fullWidth
                id="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Description takes the whole row */}
              <TextField
                autoComplete="given-name"
                name="desc"
                required
                fullWidth
                id="desc"
                label="Description"
                value={formData.desc}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default CreateJobDialog;
