import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createOrder } from '../apis/auth';


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const Razorpay = () => {

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

        const data = await createOrder()
        .then(response => response.data)
        .catch(error => {
          console.error('There was an error making the request:', error);
        });


		console.log(data)

		const options = {
			key:  'rzp_test_YrTJxdRpuU2aF6' ,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: 'https://lh3.googleusercontent.com/a/ACg8ocKOya8vf1PaL34inwDaw1gYkoeHV8MbUTPxOvCEw4EnuC5L0m-o=s96-c',
			handler: function (response) {
				console.log(response.razorpay_payment_id)
				console.log(response.razorpay_order_id)
				console.log(response.razorpay_signature)
			},
			prefill: {
				name: 'shai',
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


    return (
        <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
            <button 
                className="App-link" 
                onClick={displayRazorpay}
            >
                RZP button
            </button>
        </div>
    );
};

export default Razorpay;
