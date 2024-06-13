import path from 'path'
import generateId from '../utils'
import Razorpay from 'razorpay'


const razorpay = new Razorpay({
	key_id: 'rzp_test_YrTJxdRpuU2aF6',
	key_secret: 'GUBsfek1MvMszspxdrlJdZws'
})

export const rzp = async (req, res) => {
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
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
}