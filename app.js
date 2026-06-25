require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

app.listen(3000, () => {
    console.log("CI/CD Test Success");
    console.log("Server running");
});