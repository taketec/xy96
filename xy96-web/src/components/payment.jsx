import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { createOrder } from '../apis/auth';
import { useCreditsContext } from '../context/CreditsContextProvider';

export const createOrder = async () => {
    try {
      const token = localStorage.getItem('userToken');
  
      const data  = await API(token).post(`/razorpay`, {
        headers: { Authorization: token },
      });
      return data;
    } catch (error) {
      console.log('error in orders api');
    }
  };
  

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

const Razorpay = ({refreshCredits}) => {
	const {getCredits} = useCreditsContext()

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
			name: data.name,
			description: data.description
			
			,
			image: 'https://lh3.googleusercontent.com/a/ACg8ocKOya8vf1PaL34inwDaw1gYkoeHV8MbUTPxOvCEw4EnuC5L0m-o=s96-c',
			handler: async function (response) {
				console.log(response.razorpay_payment_id)
				console.log(response.razorpay_order_id)
				console.log(response.razorpay_signature)
				await setTimeout(refreshCredits, 2000);
				console.log("credits fetched")
			},
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


    return (
            <button 
                className="App-link" 
                onClick={displayRazorpay}
            >
                RZP button
            </button>
    );
};

export default Razorpay;
