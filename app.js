require("dotenv").config();
require("./configs/dbConnection");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var app = express();
const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };

app.use(cors(corsOptions));
app.use(logger("dev")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));



//Routes (for prefixation and testing)

app.use("/api/event", require("./routes/event"));
app.use("/api/comment", require("./routes/comment"));

// catch 404 and forward to error handler


app.use("/api/*", (req, res, next) => {  
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(error);});

  if (process.env.NODE_ENV === "production") {
    app.use("*", (req, res, next) => {
      // If no routes match, send them the React HTML.
      res.sendFile(path.join(__dirname, "public/build/index.html"));
    });
  }

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500).json({
    message: err.message,
    error: err
});
})


app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/build/index.html");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

module.exports = app;
