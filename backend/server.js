import express from 'express';
import cors from 'cors';
import userController from "./controllers/users-controller.js";
import scorecardController from "./controllers/scorecards-controller.js";
import worldArcheryApiController from './controllers/world-archery-api-controller.js';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
|| 'mongodb://localhost:27017/webdev'
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
  res.status(500).send('Internal server error.')
});
userController(app);
scorecardController(app)
worldArcheryApiController(app)
app.listen(process.env.PORT || 4000);