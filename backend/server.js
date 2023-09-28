const express = require("express");
// const cors = require("cors");
// const { connection } = require("./config/db");
// const { UserRouter } = require("./routes/user.routes");
// const { FormRouter } = require("./routes/form.routes");
const CONFIG = require("./config/config");
const mongoose = require("mongoose");
const path = require("path");

// require("dotenv").config();

const app = express();
var server = require("http").createServer(app);
// const PORT = process.env.PORT || 8080;

/** Global Configuration*/
global.GLOBAL_CONFIG = CONFIG.GLOBAL;
mongoose.Promise = global.Promise;
/** Global Configuration end */

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("welcome to the Application");
// });

// console.log(CONFIG);

app.use(express.urlencoded({ limit: "100mb", extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.json({ limit: "100mb" }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads"), { maxAge: 7 * 86400000 })
);
app.use(
  "/logs/error.log",
  express.static(path.join(__dirname, "/logs/error.log"), {
    maxAge: 100 * 10000,
  })
); // Serving Static Files For Sitemap
app.locals.pretty = false;
app.set("views", "views");
app.set("view engine", "html");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, adminid, userid"
  );
  next();
});
// app.use("/user", UserRouter);

// app.use("/form", FormRouter);

/** MongoDB Connection */
var mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: 1,
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  useUnifiedTopology: true,
};

mongoose.connect(CONFIG.DB_URL,mongooseOptions);

mongoose.connection.on("error", function (error) {
  console.error("Error in MongoDb connection: " + error);
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected!");
});
mongoose.connection.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB disconnected!");
});
/** MongoDB Connection end */

// app.listen(PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected to the database Successfully");
//   } catch (err) {
//     console.log(err);
//     console.log("Failed to connect to the database");
//   }
//   console.log(`Server running on port ${PORT}`);
// });

require("./routes")(app)

try {
  server.listen(CONFIG.PORT, function () {
    console.log(
      `Server running on port ${CONFIG.ENV} mode in port ${CONFIG.PORT}`
    );
  });
} catch (err) {
  console.log(err);
  console.log("Failed to start the server");
}
