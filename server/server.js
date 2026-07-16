require('dotenv').config();
const express=require('express');
const cors=require('cors');
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");
const roastRoutes = require("./routes/roastRoutes");
const connectDB=require('./config/db');
const introductionRoutes =require("./routes/introductionRoutes");


const app=express();
const authRoutes = require("./routes/authRoutes");
//midleware
app.use(cors());
app.use(express.json()); //parsing incming json data

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/roast", roastRoutes);
//test route

app.use(
"/api/introduction",
introductionRoutes
);
app.get("/", (req, res) => {
  res.send("PrepPilot AI Backend Running...");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});