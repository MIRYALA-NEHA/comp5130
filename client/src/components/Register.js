import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/LoginSignup.css';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            await axios.post(process.env.REACT_APP_API_URL + '/user/register', {
                name,
                email,
                password,
                profession
            });
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error('Registration Error: ', err);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <h2>Register</h2>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

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
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">
                                        Profession
                                    </label>
                                    <input
                                        type="text"
                                        id="profession"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your profession"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
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

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-register"
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Already have an account?{' '}
                                        <a href="/login" className="link-danger">
                                            Login
                                        </a>
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
