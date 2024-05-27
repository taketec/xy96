import React, { useEffect, useRef, useState } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import { googleLoginUser, validUser } from '../apis/auth';
import { useGoogleLogin } from '@react-oauth/google';
import {generate_random_string} from '../utils.js'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Google login successful', tokenResponse.access_token);

      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Login failed');
      }
    },

    onError: () => {
      setErrorMessage('Google login failed');
      console.error('Google login failed');
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-white">
        <h1 className="text-2xl font-bold text-center">Login with Google</h1>
        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        <button onClick={() => googleLogin()} className="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Sign in with Google 🚀
        </button>
        <div className="flex justify-center mt-8">
          <h1 className="text-xs text-center">Welcome to xy96</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;