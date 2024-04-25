import express from "express";
require("dotenv").config();
import router from "./routers/auth";
import api from "./routers/api"
const bodyParser = require('body-parser');
const db = require("./config/database/mongodb");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//cors
const corsOptions = {
  origin:'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

//middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routers
app.use("/api/auth", router);
app.use("/api", api)

//database
db.connectDatabase();

let PORT: undefined | string;
process.env.STATUS === "production"
  ? (PORT = process.env.PROD_PORT)
  : (PORT = process.env.DEV_PORT);

const httpServer = require("http").createServer(app);
httpServer.listen(PORT, function () {
  console.log(`Server in ${process.env.STATUS} mode, listening on ${PORT}`);
});

export default app;
