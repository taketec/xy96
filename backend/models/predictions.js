import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";

const predictionSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    id: {
        type: String,
        required: true
      },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String ,
        required: true
    },
    output: {
        type: String
    }

},
  {
    timestamps: true,
  }
);


predictionSchema.methods.updatePrediction = function (status, output = null) {
    try {
      this.status = status
      if(output){ this.output = output }
      return this.save();
    } catch (error) {
      console.log('error while adding credits');
    }
  };
  

const predictionModel = mongoose.model('Prediction', predictionSchema);
export default predictionModel;
