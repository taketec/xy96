import { rzp, rzp_webhook } from '../controllers/payment.js';
import express from 'express';

const router = express.Router();


router.post('/razorpay', rzp);
router.post('/razorpay-callback', rzp_webhook);

//all of the endpoints required for authentication are managed in the user controller and user routes
//all of the auth endpoints will be at /auth
//  /register will take in firstname, lastname, email, password; returns a jwt token
//  /login will take email and password and return a jwt token
//  /valid user will take in the userid and check if the user is valid or not

export default router;