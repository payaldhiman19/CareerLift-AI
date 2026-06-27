const express=require('express');
const cors=require('cors');
require('dotenv').config();

const connectDB=require('./config/db');


const app=express();
const authRoutes = require("./routes/authRoutes");
//midleware
app.use(cors());
app.use(express.json()); //parsing incming json data

connectDB();
app.use("/api/auth", authRoutes);
//test route
app.get("/", (req, res) => {
  res.send("PrepPilot AI Backend Running...");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});