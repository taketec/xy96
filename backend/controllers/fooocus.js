import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import axios from 'axios';
import Prediction from "../models/predictions.js" 
import replicate from '../replicate/replicate.js';
import { fooocusCost } from '../credits.js';

export const create_prediction = async (req,res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user.checkCredits(fooocusCost)){
        return res.status(422).json({error: "insufficient funds"})
      }

      const start = await replicate.predictions.create({
            version: "612fd74b69e6c030e88f6548848593a1aaabe16a09cb79e6d714718c15f37f47",
            input: {
                prompt: req.body.prompt,//
                cn_type1: "ImagePrompt",
                cn_type2: "ImagePrompt",
                cn_type3: "ImagePrompt",
                cn_type4: "ImagePrompt",
                sharpness: 2,
                image_seed: 6091967260935476000,
                uov_method: "Disabled",
                image_number: 1,
                guidance_scale: 3,
                refiner_switch: 0.5,
                negative_prompt: "unrealistic, saturated, high contrast, big nose, painting, drawing, sketch, cartoon, anime, manga, render, CG, 3d, watermark, signature, label",
                style_selections: "Fooocus V2,Fooocus Photograph,Fooocus Negative",
                uov_upscale_value: 0,
                outpaint_selections: "",
                outpaint_distance_top: 0,
                performance_selection: req.body.performance_selection,//
                outpaint_distance_left: 0,
                aspect_ratios_selection: req.body.aspect_ratios_selection,//
                outpaint_distance_right: 0,
                outpaint_distance_bottom: 0,
                inpaint_additional_prompt: ""
              },
            webhook: "https://e9d1-116-75-159-18.ngrok-free.app/fooocus/receive_prediction",
            webhook_events_filter: ["start","output","completed"], 
          });

          const prediction = new Prediction({
            user: req.userId,
            id: start.id,
            status: start.status || "starting",
            type: "Fooocus"
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
        console.log(id)//remove mone from client
        const prediction = await Prediction.findOne({ id });
        
        if (req.body.status == "processing"){
        const user = await User.findById(prediction.user);
        if (!user) {throw new Error('User not found');}
        user.subtractCredits(fooocusCost)
        console.log(`subtracted credits from  ${user}`)//remove money from the users acc if if its started processing
        }

        if (req.body.output){
        prediction.updatePrediction(req.body.status, req.body.output[0]) }
        else {prediction.updatePrediction(req.body.status)}
        console.log(prediction)

        return res.status(200).json({ status: "received prediction" })

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
