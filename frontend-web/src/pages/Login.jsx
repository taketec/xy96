import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, validUser, googleLoginUser } from '../apis/auth'; // import necessary functions
import ClipLoader from 'react-spinners/ClipLoader';
import { useGoogleLogin } from '@react-oauth/google'; // import Google login hook

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const NEXTPAGE = '/main';

  // Effect to check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  // Google login hook setup
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        if (access_token) {
          const response = await googleLoginUser({ token: access_token });
          const jwtToken = response.data.token;

          localStorage.setItem('userToken', jwtToken);
          navigate(NEXTPAGE);
        }
      } catch (error) {
        console.error('Google login error:', error);
        setErrorMessage('Google login failed. Please try again.');
      }
    },
    onError: () => {
      console.error('Google login failed');
      setErrorMessage('Google login failed. Please try again.');
    }
  });

  // Regular login submit handler
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-[#36393f]">
        <h1 className="text-2xl font-bold text-center text-[#ffffff]">Sign in with Google</h1>
        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        <div className="text-center mt-4 text-[#b9bbbe]">
          <button 
            onClick={googleLogin} 
            className="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Sign in with Google 🚀
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-2 text-sm rounded bg-[#2c2f33] text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-2 text-sm rounded bg-[#2c2f33] text-white"
            required
          />
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            {isLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
