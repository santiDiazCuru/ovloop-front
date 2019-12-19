const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./server/routes/index.routes");
//const db = require('../db/models').db
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose.Promise = require("bluebird");

// EXPRESS EJECUTION
const app = express();

// MONGOOSE SETTINGS (DEPRECATIONS)
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
// mongoose.set('useFindAndModify', false);

// CONNECT TO DB (con docker!!!!)
// mongoose
//   .connect("mongodb://mongo:27017/dashboard")
//   .then(() => console.log("mongoDB connected to ovloop dashboard"))
//   .catch(err => console.log("db error: ", err));

//PASSPORT & SESSION
const session = require("express-session");

// Requiring passport as we've configured it
const passport = require("./server/passport/config");

// SESSION
app.use(session({ secret: "ovloop" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

//CONNECT TO DB (para localhost)
mongoose
  .connect("mongodb://localhost/dashboard")
  .then(() => console.log("mongoDB connected to ovloops dashboard"))
  .catch(err => console.log("db error: ", err));

// SETTTINGS
app.set("port", process.env.PORT || 7777);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "./server/public")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/", router);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./server/public", "index.html"));
});

const server = app.listen(app.get("port"), () => {
  console.log("App running in port ", app.get("port"));
});

module.exports = app;
