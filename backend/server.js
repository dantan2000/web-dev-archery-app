import express from 'express';
import cors from 'cors';
import userController from "./controllers/users-controller.js";
import scorecardController from "./controllers/scorecards-controller.js";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
|| 'mongodb://localhost:27017/webdev'
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
userController(app);
scorecardController(app)
app.listen(process.env.PORT || 4000);