require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const fetchData = require("./script");
const path = require("path");
const cors = require("cors");
const corn = require("node-cron");

connectDB();
const corsOption = {
    origin: process.env.ALLOWED_CLIENTS.split(",")
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
// Routes
app.get("/", (req, res) => {
    res.render("index");
})
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));


corn.schedule("0 1 * * *", fetchData);
app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
})