import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResumes";
import MyResumes from "./pages/MyResumes";
import ResumeReport from "./pages/ResumeReport";
import Profile from "./pages/Profile";
import InterviewPreparation from "./pages/InterviewPreparation";
import JobMatch from "./pages/JobMatch";
import AITools from "./pages/AITools";
import ResumeRoast from "./pages/ResumeRoast";
import IntroductionCoach from "./pages/IntroductionCoach";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadResume />} />
      <Route path="/resumes" element={<MyResumes />} />
      <Route path="/report/:id" element={<ResumeReport />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/ai-tools" element={<AITools />} />
      <Route path="/job-match/:id" element={<JobMatch />} />
      <Route path="/interview/:id"element={<InterviewPreparation />}/>
      <Route path="/resume-roast/:id" element={<ResumeRoast />} />
      <Route
path="/introduction-coach/:id"
element={<IntroductionCoach/>}
/>
</Routes>
  );
}

export default App;