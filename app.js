const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
//MIDDLEWARE FOR HANDLING ERRORS
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
app.use("/api", authRoutes);
app.use(errorHandler);
//Port
const port = process.env.PORT || 9000;
//add connection
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//DataBase connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MONGODB CONNECTED TO NODEJS BACKEND"))
  .catch((err) => console.log(err));
