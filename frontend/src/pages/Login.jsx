import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, validUser } from '../apis/auth';
import ClipLoader from 'react-spinners/ClipLoader';
import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('userToken');

        if (token) {
          const response = await validUser();
          if (response.token) {
            navigate('/dashboard');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      localStorage.setItem('userToken', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful Google login
  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    // Use response.profileObj or response.tokenId for further processing
    // You might want to authenticate the user on the backend using the token
    // and then navigate to the desired page.
  };

  // Handle failed Google login
  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
    // setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-[#36393f]">
        <h1 className="text-2xl font-bold text-center text-[#ffffff]">Login</h1>
        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-[#b9bbbe]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-[#b9bbbe]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-3 py-2 rounded-lg bg-[#7289da] text-white font-medium hover:bg-[#677bc4] ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="text-[#b9bbbe] text-sm text-center mt-4">
          Dont't have an account?{' '}
          <Link to="/register" className="text-[#7289da] underline">
            Sign up
          </Link>
        </p>


        <div className="text-center mt-4 text-[#b9bbbe]">
          <p>Or</p>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google client ID
            buttonText="Sign in with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="google-login-button mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
