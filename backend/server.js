const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to the Application");
});

app.use("/user",UserRouter)

// app.post("/signup", async (req, res) => {});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the database Successfully");
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to the database");
  }
  console.log(`Server running on port ${PORT}`);
});
