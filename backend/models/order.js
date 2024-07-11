import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";

const orderSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    email: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    amount: {
      type: Number ,
      required: true
    },
    status: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.methods.addCredits = function (credits,receipt) {
  try {
    this.lastPayment = receipt
    this.credits += credits
    return this.save();
  } catch (error) {
    console.log('error while adding credits');
  }
};


const orderModel = mongoose.model('Order', orderSchema);


export default orderModel;
