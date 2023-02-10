const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const config = require("config");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

const app = express();

//this Bodyparse middleware helps handle top sent from an api as an object
app.use(express.json());

//loading the environment variables
dotenv.config({ path: "./config.env" });

const server = http.createServer(app);
const io = socketio(server).sockets;

//Dev loggin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// DB config
const db = config.get("mongoURI");

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected`));

// app.all("/", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// app.all("/api/register", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => res.send("Home page is online..."));
app.use("/api/register", require("./routes/api/register"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/fetchuser", require("./routes/api/fetchuser"));

//adding change streams, change streams have not yet been implemented
//const client = new MongoClient(db)
//require("./middleware/changeStreams")(client);
//console.log(mongoose.findOne('transaction'))

//Web Socket
require("./middleware/socket")(app, io, db);

const port = process.env.PORT || 5001;
server.listen(port, () => `Server started on ${port}`);
