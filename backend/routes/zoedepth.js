import {
    create_prediction,
    receive_prediction,
    } from '../controllers/zoedepth.js';
import express from 'express';

import { Auth } from '../middleware/auth.js';

const router = express.Router();


router.post('/create',Auth, create_prediction);
router.post('/receive_prediction', receive_prediction);

export default router;