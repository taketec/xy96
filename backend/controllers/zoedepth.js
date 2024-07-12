import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import axios from 'axios';
import Replicate from "replicate";
import Prediction from "../models/predictions.js" 
import { zoedepthCost } from '../credits.js';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

export const create_prediction = async (req,res) => {
    try {

      const user = await User.findById(req.userId);

      if (!user.checkCredits(zoedepthCost)){
        return res.status(422).json({error: "insufficient funds"})
      }

      const image = req.body.image
        const start = await replicate.predictions.create({
            version: "04a18488430fc46b3df88ddaa14c393f95b93ccd30f482340c8d08db1d6d0b83",
            input: {
              image: image,
              model_type: "ZoeD_N"
              },
            webhook: "https://e9d1-116-75-159-18.ngrok-free.app/zoedepth/receive_prediction",
            webhook_events_filter: ["start","output","completed"], 
          });

          const prediction = new Prediction({
            user: req.userId,
            id: start.id,
            status: start.status || "starting",
            type: "Zoedepth"
          });
      
          const pred = await prediction.save()

          console.log(pred)

          console.log(start)

          return res.status(200).json({ prediction_id: start.id })

	}
    catch(error){
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export const receive_prediction = async(req,res) => {
    try {
        
        console.log(req.body)
        const id = req.body.id
        console.log(id)
        const prediction = await Prediction.findOne({ id });
        console.log(prediction)
        if (req.body.output!=null){
        prediction.updatePrediction(req.body.status, req.body.output) }
        else {prediction.updatePrediction(req.body.status)}
        console.log(prediction)

        return res.status(200).json({ status: "received prediction" })

	}catch(error){
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export const cancel_prediction = async (req, res)  => {
  try{  
    const response = await replicate.predictions.cancel(req.body.prediction);
    return res.json(response)  
  }catch(error){
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export const get_status = async (req ,res) => {
  try{
    const id = req.body.id
    console.log(id)
    const prediction = await Prediction.findOne({ id });
    if (prediction.output){
      return res.json({
        id: prediction.id,
        status:prediction.status.Prediction,
        type:prediction.type,
        output:prediction.output
      })}
    else{
      return res.json({
          id: prediction.id,
          status:prediction.status.Prediction,
          type:prediction.type,
        }  
      )
    }

  }catch(error){		
    console.error(error);
		return res.status(500).json({ error: "Internal server error" });
}
} 
