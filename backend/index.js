import 'dotenv/config'
import mongoDBConnect from './mongoDb/Connection.js';
import express from 'express';
import userRoutes from './routes/user.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose"

import rzpRoutes from './routes/payment.js'

import fooocusRoutes from './routes/fooocus.js'
import zoedepthRoutes from './routes/zoedepth.js'
import triposrRoutes from './routes/triposr.js'

mongoose.set('strictQuery', false);
mongoDBConnect();

const PORT=process.env.PORT || 8000
console.log(process.env.rzp_key_id,process.env.rzp_key_secret)

const app = express();
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

//simple middleware to log requests
const createLog = (req, res, next) => {
  res.on("finish", function() {
    console.log(req.method,req.body, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(createLog)
app.use(cors(corsConfig));
app.use('/', userRoutes);
app.use('/', rzpRoutes);
app.use('/fooocus', fooocusRoutes);
app.use('/zoedepth', zoedepthRoutes);
app.use('/triposr', triposrRoutes);

app.listen(PORT, () => {
    console.log(`Server Listening at PORT - ${PORT}`);
  });

