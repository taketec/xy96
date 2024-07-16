import User from "../models/user.js";
import Prediction from "../models/predictions.js" 
import { triposrCost } from "../credits.js";
import replicate from "../replicate/replicate.js";


export const create_prediction = async (req,res) => {
    try {

      const user = await User.findById(req.userId);

      if (!user.checkCredits(triposrCost)){
        return res.status(422).json({error: "insufficient funds"})
      }

      const image = req.body.image
        const start = await replicate.predictions.create({
            version: "e0d3fe8abce3ba86497ea3530d9eae59af7b2231b6c82bedfc32b0732d35ec3a",
            input: {
              image_path: image,
              foreground_ratio: 0.85,
              do_remove_background: false
            },
            webhook: "https://e9d1-116-75-159-18.ngrok-free.app/triposr/receive_prediction",
            webhook_events_filter: ["start","output","completed","canceled"], 
          });

          const prediction = new Prediction({
            user: req.userId,
            id: start.id,
            status: start.status || "starting",
            type: "TripoSR"
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
