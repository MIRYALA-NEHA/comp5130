import React, { useState } from 'react';
import axios from 'axios';
import './css/LoginSignup.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginSignup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle Google Login
    const onGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + '/auth/google', {
                googleToken: credentialResponse.credential,
            });
            localStorage.setItem('JWT-token', res.data.token);
            navigate('/Profile');
        } catch (err) {
            console.error('Google Login Error: ', err);
        }
    };

    // Handle Email/Password Login
    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + '/user/login', {
                email,
                password,
            });
            localStorage.setItem('JWT-token', res.data.token);
            localStorage.setItem('email', email);

            console.log(res.data)
            navigate('/Profile', { state: { email } });
        } catch (err) {
            console.error('Login Error: ', err);
            alert('Invalid email or password.');
        }
    };

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Illustration of user authentication"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <h2>Welcome</h2>
                                <div className="form-outline mb-4">
                                     <label className="form-label" htmlFor="email">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />                                    
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />                                    
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/forgotPassword" className="text-body">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-login"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>

                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                    </div>

                                    <GoogleLogin
                                        onSuccess={onGoogleSuccess}
                                        onError={() => {
                                            console.error('Google Login Failed');
                                        }}
                                    />

                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="link-danger">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
