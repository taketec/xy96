import {
    register,
    login,
    validUser,
    googleLogin
  } from '../controllers/user.js';
import { cancel_prediction } from '../controllers/user.js';
  import express from 'express';

  import { Auth } from '../middleware/auth.js';

const router = express.Router();


router.post('/auth/google', googleLogin);
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/valid', Auth, validUser);

router.post('/cancel_prediction', Auth , cancel_prediction)

//all of the endpoints required for authentication are managed in the user controller and user routes
//all of the auth endpoints will be at /auth
//  /register will take in firstname, lastname, email, password; returns a jwt token
//  /login will take email and password and return a jwt token
//  /valid user will take in the userid and check if the user is valid or not

export default router;