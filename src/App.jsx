import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EmployerLogin from "./pages/EmployerLogin";
import EmployerSignUp from "./pages/EmployerSignUp";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./components/Employer/EmployerProfile";
import EmployerJobsTable from "./components/Employer/EmployerJobsTable";
import UserDashboard from "./components/User/UserDashboard";
import UserJobstable from "./components/User/UserJobsTable";
import UserProfile from "./components/User/UserProfile";
import { useAuth } from "./context/AuthContext";
import UserSignUp from "./pages/UserSignUp";

const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      // Employer routes
      <Route path="/employer/login" element={<EmployerLogin />} />
      <Route path="/employer/signup" element={<EmployerSignUp />} />
      <Route path="/employer" element={<EmployerDashboard />}>
        <Route index path="jobs" element={<EmployerJobsTable />} />
        <Route path="profile" element={<EmployerProfile />} />
      </Route>
      // User Routes
      <Route path="/user/signup" element={<UserSignUp />} />
      <Route path="/user" element={<UserDashboard />}>
        <Route index path="jobs" element={<UserJobstable />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
