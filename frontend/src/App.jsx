import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PatientSignup from "./PatientSignup";
import InsurerSignup from "./InsurerSignup";
import Navigation from "./components/NewNav";
import About from "./About";
import Contact from "./Contact";
import Upload from "./upload";
import Result from "./Result";
import TakeTest from "./Taketest";
import Test from "./Test";
import AssessmentPage from "./AssessmentPage";
import HealthPlan from "./HealthPlan";
import Patient from "./patientdashboard";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">

      {/* <Result/> */}
      {/* <TakeTest/> */}
      {/* <Test/> */}
      {/* <AssessmentPage/> */}
      {/* <HealthPlan/> */}
      {/* <Patient/> */}

      {isHomePage && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/patient" element={<PatientSignup />} />
        <Route path="/signup/insurer" element={<InsurerSignup />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/TakeTest" element={<TakeTest/>} />
        <Route path="/AssessmentPage" element={<AssessmentPage />} />
        <Route path="/HealthPlan" element={<HealthPlan />} />
        <Route path="/Patient" element={<Patient />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes> 
    </div>
  );
}

export default App;
