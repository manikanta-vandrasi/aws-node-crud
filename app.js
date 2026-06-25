require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
console.log("CI/CD Test Success");

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running");
});