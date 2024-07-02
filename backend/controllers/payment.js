import path from 'path'
import generateId from '../utils'
import Razorpay from 'razorpay'
import order from '../models/order.js';
import user from '../models/user.js';
import jwt from 'jsonwebtoken';

const razorpayConfig = {
	key_id: process.env.rzp_key_id,
	key_secret: process.env.rzp_key_secret
  };

const razorpay = new Razorpay(razorpayConfig)

export const rzp = async (req, res) => {
	
	let token = req.headers.authorization.split(' ')[0]; //when using browser this line
    console.log(token,"token from middleware")
    const verifiedUser = jwt.verify(token, process.env.SECRET);
    req.token = token;
    req.userId = verifiedUser.id

	const validuser = await user
	.findOne({ _id: req.userId })
	.select('-password');

	console.log(validuser)

	const payment_capture = 1
	const amount = 499
	const currency = 'INR'
    const receipt = generateId(8)
    console.log(receipt)
	const options = {
		amount: amount * 100,
		currency,
		receipt: receipt,
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		return res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
        return res.status(500).json({ error:error.error })
	}
}

export const rzp_webhook = async (req, res) => {
	console.log("################ this is the reverse api call ###################################")
	console.log(req.headers)
	console.log(req.body,req.body.payload.payment, req.body.payload.order)
	
	return res.json({
		data:"order succeded"
	})
}