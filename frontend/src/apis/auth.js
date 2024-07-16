import axios from 'axios';
import { API } from './api';


let url = 'http://localhost:8000';

export const googleLoginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/google`, body);
  } catch (error) {
    console.log('error in google-loginuser api');
  }
};


export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/login`, body);
  } catch (error) {
    console.log('error in loginuser api');
  }
};

export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/register`, body);
    
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return { error: error.response.data.error };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log('error in valid user api');
  }
};

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
