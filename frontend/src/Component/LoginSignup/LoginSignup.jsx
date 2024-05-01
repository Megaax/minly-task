import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import ContentPage from '../ContentPage/ContentPage';
import { useUser } from '../../providers/userProvider';

const LoginSignup = () => {
    const { user, setUser } = useUser()
    const [action, setAction] = useState("Signup");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null); // Initialize user data state
    const history = useHistory(); // Initialize useHistory hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (action) => {
        try {
            const url = action === 'Signup' ? 'http://localhost:3001/users/register' : 'http://localhost:3001/users/login';
            const response = await axios.post(url, formData);
            console.log(response.data);
            // if (response.token && response.id) {
            // Redirect to the content page with userId, firstName, and lastName as query parameters
            console.log("hello")
            setUser({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                token: response.data.token,
                id: response.data.id
            })
            setErrorMessage('');
            history.push(`/content?token=${response.token}&userId=${response.id}&firstName=${response.firstName}&lastName=${response.lastName}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
            console.error('Error:', error);
        }
    };


    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action !== "Login" && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="text" name="firstName" placeholder='Firstname' value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="text" name="lastName" placeholder='Lastname' value={formData.lastName} onChange={handleChange} />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="submit-container">
                <div className={action === "Login" ? "submit grey" : "submit"} onClick={() => { setAction("Signup"); handleSubmit("Signup"); }}>Signup</div>
                <div className={action === "Signup" ? "submit grey" : "submit"} onClick={() => { setAction("Login"); handleSubmit("Login"); }}>Login</div>
            </div>

            {/* Pass both token and user data as props to ContentPage component */}
            {userData && <ContentPage token={userData.token} user={userData} />}
        </div>
    );

};

export default LoginSignup;
