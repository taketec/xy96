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
    reciept: {
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


const userModel = mongoose.model('Order', orderSchema);
export default userModel;
