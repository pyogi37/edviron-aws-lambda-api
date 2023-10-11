const express = require("express");
const sls = require("serverless-http");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const connectDB = require("./config/db");
const port = process.env.PORT;

const {
  getAndCheckDefaulters,
} = require("./controllers/getAndCheckDefaulters");

connectDB();

app.get("/", async (req, res, next) => {
  res.status(200).send("Hello World");
});

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
app.get("/:schoolId", getAndCheckDefaulters);

app.listen(port, function (err) {
  if (err) {
    console.log("error :", err);
    return;
  }
  console.log("Server is running on port:", port);
});

// module.exports.server = sls(app);
