import { rzp, rzp_webhook, get_credits, get_latest_credits } from '../controllers/payment.js';
import express from 'express';
import { Auth } from '../middleware/auth.js';


const router = express.Router();


router.post('/razorpay', rzp);
router.post('/razorpay-callback', rzp_webhook);
router.get('/get-credits', Auth, get_credits);
router.get('/get-latest-credits', Auth, get_latest_credits);//route meant to be polled

//all of the endpoints required for authentication are managed in the user controller and user routes
//all of the auth endpoints will be at /auth
//  /register will take in firstname, lastname, email, password; returns a jwt token
//  /login will take email and password and return a jwt token
//  /valid user will take in the userid and check if the user is valid or not

export default router;