import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/Profile.css';

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || localStorage.getItem('email');

    const getUserInfo = async () => {
        try {
            const res = await axios.post(
                process.env.REACT_APP_API_URL+ '/user/profile',
                { email },
                { headers: { Authorization: `JWT ${localStorage.getItem('JWT-token') || ''}` } }
            );

            if (!res.data.success) {
                navigate('/login');
            } else {
                setUserInfo(res.data.user);
            }
        } catch (err) {
            setError('Failed to load user information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        console.log(userInfo);
        try {
            const res = await axios.put(
                process.env.REACT_APP_API_URL+'/user/profile',
                userInfo,
                { headers: { Authorization: `JWT ${localStorage.getItem('JWT-token') || ''}` } }
            );
            if (res.data.success) {
                alert('Profile updated successfully!');
                setIsEditing(false);
            } else {
                alert('Failed to update profile.');
            }
        } catch (err) {
            alert('Error saving profile. Please try again.');
        }
    };

    useEffect(() => {
        if (!email) {
            navigate('/login');
        } else {
            getUserInfo();
        }
    }, [navigate, email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('JWT-token');
            localStorage.removeItem('email');
            navigate('/login');
        }
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                    alt="profile"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={userInfo?.name || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        userInfo?.name
                                    )}
                                </h5>
                                <h6>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="profession"
                                            value={userInfo?.profession || 'Web Developer'}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        userInfo?.profession || 'Web Developer'
                                    )}
                                </h6>
                               
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="profile-tab"
                                            data-toggle="tab"
                                            href="#profile"
                                            role="tab"
                                            aria-controls="profile"
                                            aria-selected="false"
                                        >
                                           
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            {isEditing ? (
                                <button
                                    className="profile-edit-btn"
                                    type="button"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="profile-edit-btn"
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="profile-edit-btn"
                                type="button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>
                                    <h3>My Learnings</h3>
                                </p>
                                <ul style={{ listStyle: 'square' }}>
                                    {userInfo?.learnings?.length > 0 ? (
                                        userInfo.learnings.map((learning, index) => (
                                            <li key={index}>{learning}</li>
                                        ))
                                    ) : (
                                        <li>No learnings added yet.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userInfo?.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userInfo?.email}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
