import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import ViewJobDialog from "./ViewJobDialog";
import UpdateJobDialog from "./UpdateJobDialog";
import { useAuth } from "../../context/AuthContext";
import CreateNotificationDailog from "./CreateNotificationDailog";

// const { BASE_URL } = useAuth();
// const token = localStorage.getItem("token");

const JobNotification = () => {
  const { jobnotification, setJobnotification } = useAuth();
  //   const { jobs, setJobnotification } = useAuth();

  const updateJobs = (newJob) => {
    setJobnotification((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleJobDeletion = (deletedJobId) => {
    const updatedJobs = jobnotification.filter(
      (job) => job._id !== deletedJobId
    );
    setJobnotification(updatedJobs);
    fetchJobs();
  };

  const handleJobUpdate = (updatedJob) => {
    const updatedJobIndex = jobnotification.findIndex(
      (job) => job._id === updatedJob._id
    );

    if (updatedJobIndex !== -1) {
      const updatedJobs = [...jobnotification];
      updatedJobs[updatedJobIndex] = updatedJob;
      setJobnotification(updatedJobs);
    }
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          All Jobs Notifications
        </Typography>
        <CreateNotificationDailog updateJobs={updateJobs} />
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
            {jobnotification?.length > 0 ? (
              jobnotification.map((job) => (
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

export default JobNotification;
