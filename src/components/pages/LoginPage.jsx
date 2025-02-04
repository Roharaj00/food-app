/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/auth';

const API_URL = "http://localhost:3000/api";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            
            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirect to recipes or home page
            navigate('/recipes');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                />
                <button 
                    type="submit" 
                    className="login-btn" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
                <p>
                    Don't have an account? 
                    <span 
                        onClick={() => navigate('/register')} 
                        className="register-link"
                    >
                        Create Account
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;