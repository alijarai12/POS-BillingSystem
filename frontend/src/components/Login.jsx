import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {

    const navigate = useNavigate(); // Initialize useNavigate hook

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:5000/auth/user/login', formData);
        const token = response.data.token;
        
        // Store the token in localStorage or sessionStorage
        // const ls =  localStorage.setItem('token', token);
        localStorage.setItem('token', token);
        console.log('Token:', token); // Log the token
        setMessage("Login successful!");

        // Optionally, redirect to Dashboard page or perform other actions upon successful login
        navigate('/dashboard');

        } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        setMessage('Error logging in: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>   
            <div className="max-w-md p-4 border rounded-lg shadow-lg">
                {message && <p className="mb-4 text-red-500">{message}</p>}
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
                        placeholder="Enter your email"
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out"
                        placeholder="Enter your password"
                    />
                    </div>

                    <Button type="submit" className="mt-2" color="primary">Login</Button>

                    <Button type="button" className="mt-2" onClick={() => navigate('/forgot-password/send-reset-password-email')}>Forget Password</Button>

                </form>
            </div>
        </div>    
    );
    }

export default Login;
