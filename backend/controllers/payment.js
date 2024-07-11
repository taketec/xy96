import path from 'path'
import generateId from '../utils.js'
import Razorpay from 'razorpay'
import Order from '../models/order.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const razorpayConfig = {
	key_id: process.env.rzp_key_id,
	key_secret: process.env.rzp_key_secret
  };

const razorpay = new Razorpay(razorpayConfig)

const idempotencyKeys = new Set();

export const rzp = async (req, res) => {
	
	let token = req.headers.authorization.split(' ')[0]; //when using browser this line
    console.log(token,"token from middleware")
    const verifiedUser = jwt.verify(token, process.env.SECRET);
	
	if (!verifiedUser){return res.status(440).json({ error:"users session expired or doesnt exist, login again or signup." })}//if the user doesnt have a token
    
	req.token = token;
    req.userId = verifiedUser.id

	const validuser = await User
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

		const order = new Order({
			user: validuser.id,
			email: validuser.email,
			receipt: response.receipt,
			amount: response.amount_due,
			status: response.status,
			name: 'Mini',
			description: '100 credits for 499'
		});
	  
		  // Save the order to the database
		  const createdOrder = await order.save();

		return res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			name: 'Mini',
			description: '100 credits for 499'
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

		// do a validation
	const secret = process.env.webhook_secret

	console.log(req.body)
	
	const idempotencyKey = req.header('x-razorpay-event-id');
	
	//idempotency check
		if (!idempotencyKeys.has(idempotencyKey)) {
			
			console.log('order has passed the idempotency check')

			const shasum = crypto.createHmac('sha256', secret)
			shasum.update(JSON.stringify(req.body))
			const digest = shasum.digest('hex')
			console.log(`this is the signature`)
			console.log(digest, req.headers['x-razorpay-signature'])

			//validating the webhook

			if(digest==req.headers['x-razorpay-signature'])
			{	
				console.log('webhook was validated')
				try {
					let receipt = req.body.payload.order.entity.receipt
					let amount_paid = req.body.payload.order.entity.amount_paid
					const order = await Order.findOne({ receipt });
				
					if (!order) {
						console.log("order by the receipt not found" , )
					}
				
					// Update the order status
					order.status = req.body.payload.order.entity.status; // or any other status you want to set

					const user = await User
					.findOne({ _id: order.user })
					.select('-password');
				
					if (user) {
					// Assuming amountPaid is the amount to be added as credits
					await user.addCredits(amount_paid,receipt);
					console.log(user)
					}
					else{console.log("user not found")}

					idempotencyKeys.add(idempotencyKey);

					await order.save();
				
				} catch (error) {
					console.error("Error updating order status:", error);
				}
			}else(console.error('webhook failed validation'))

	} else (console.log('order already processed'))

	return res.json({
		data:"order succeded"
	})
}

export const get_credits = async (req,res) => {
    try {
		
		const validuser = await User
		.findOne({ _id: req.userId })
		.select('-password');

		console.log(validuser)

		return res.status(200).json({
			credits:validuser.credits 
		})

	}catch(error){
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export const get_latest_credits = async (req,res) => {
    try {
		const validuser = await User
		.findOne({ _id: req.userId })
		.select('-password');

		console.log(validuser)

		if(validuser.lastPayment){
			if(req.body.latest_receipt == validuser.lastPayment){
				return res.status(200).json({
					receipt : req.body.latest_receipt,
					credits : validuser.credits 
				})
			}else{return res.status(200).json({	receipt : req.body.latest_receipt
			})}

		}else{return res.status(440).json({ error:"user hasnt made any payments, this is a mistake" })}
	}catch(error){
		console.error(error);
        return res.status(500).json({ error: "Internal server error" });
	}
}
