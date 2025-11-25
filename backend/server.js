const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/admin", require("./routes/adminRouter"));
app.use("/api/candidate", require("./routes/candidateRoutes"));
app.use("/api/employer", require("./routes/employerRoutes"));
app.use("/api/jobs", require("./routes/JobRoutes"));
app.use("/uploads", express.static("uploads"));


app.listen(5000, () => console.log("Server running on port 5000"));
