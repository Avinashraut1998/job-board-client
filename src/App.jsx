import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EmployerSignUp from "./pages/EmployerSignUp";
import EmployerProfile from "./components/EmployerProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerJobsTable from "./components/EmployerJobsTable";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/employer/signup" element={<EmployerSignUp />} />
      <Route path="/employer" element={<EmployerDashboard />}>
        <Route index path="jobs" element={<EmployerJobsTable />} />
        <Route path="profile" element={<EmployerProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
