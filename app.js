var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
let projectsRouter = require("./routes/projects");
let foodsRouter = require("./routes/foodsExtended");
let productRouter = require("./routes/product");
let scanRouter = require("./routes/scan");

var app = express();
// mongoDB

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "doesn't matter in our case", // but it's required
    resave: false,
    saveUninitialized: false, // don't create cookie for non-logged-in user
    // MongoStore makes sure the user stays logged in also when the server restarts
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));
// this needs to be after all the other setup (i.e. the order is important )
app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/products", productRouter);
app.use("/api/scan", scanRouter);

// catch 404 and forward to error handler
app.use("/api", function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
