import path from 'path'
import generateId from '../utils'
import Razorpay from 'razorpay'

const razorpayConfig = {
	key_id: process.env.rzp_key_id,
	key_secret: process.env.rzp_key_secret
  };

const razorpay = new Razorpay(razorpayConfig)

export const rzp = async (req, res) => {
	console.log(razorpayConfig)
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