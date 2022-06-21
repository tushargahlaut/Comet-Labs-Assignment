// const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.js");
const problemRouter = require("./routes/problems.js");
const mongoose = require("mongoose");
const app = express();
const isAdmin = require("./middleware/auth.js");

// dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// connect to MongoDB

const port = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

  app.get("/",(req,res)=>{
    res.send("Welcome to my API");
  })
  

//setup routes
app.use("/users", userRouter);
app.use("/admin",isAdmin,problemRouter);

//Fix Bug


