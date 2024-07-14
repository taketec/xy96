import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, validUser } from '../apis/auth';
import ClipLoader from 'react-spinners/ClipLoader';
import { googleLoginUser } from '../apis/auth';
//import { shell } from 'electron';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const NEXTPAGE = '/three' 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log(`token in localstorage ${localStorage.getItem('userToken')}`)
        const token = localStorage.getItem('userToken');

        if (token) {
          const response = await validUser();
          if (response.token) {
            navigate(NEXTPAGE);
          } else {
            localStorage.removeItem('userToken');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
      window.electron.receiveData((receivedData) => {
        console.log(receivedData, 'from login.jsx')

        for (let element of receivedData) {
          // Check if the element contains the token parameter
          if (element.includes("token=")) {
            // Extract and return the token value
            const url = new URL(element);
            setToken(url.searchParams.get("token"));          
          }
        }
      });
  },[]);

  useEffect(()=>{
    async function getJwt() {
    if (token){
    console.log(token)
    const response = await googleLoginUser({ token: token })
    console.log(response)
    localStorage.setItem('userToken', response.data.token);
    navigate(NEXTPAGE);
    }
  }
  getJwt()

  },[token])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      localStorage.setItem('userToken', token);
      navigate(NEXTPAGE);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful Google login
  const googleLogin = () => {
    window.electron.openExternalLink('http://localhost:3000/');
  };
  

  // Handle failed Google login
  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
    // setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-[#36393f]">
      <h1 className="text-2xl font-bold text-center text-[#ffffff]">Sign in with Google</h1>
        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        <div className="text-center mt-4 text-[#b9bbbe]">
          <button onClick={() => googleLogin()} className="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Sign in with Google 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
