import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Username = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username) {
            setErrorMessage('Please enter a username.');
            return;
        }

        // Clear any previous error message
        setErrorMessage(null);

        // Navigate to the Register page and pass the username as state
        navigate('/register', { state: { username } });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
            <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-[#36393f]">
                <h1 className="text-2xl font-bold text-center text-[#ffffff]">Enter Your Username</h1>
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium text-[#b9bbbe]">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-[#7289da] text-white font-medium hover:bg-[#677bc4]"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Username;
