import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentPage.css'; // Import CSS file
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useUser } from '../../providers/userProvider';

const ContentPage = () => {
    const [mediaContent, setMediaContent] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const location = useLocation(); // Initialize useLocation hook
    const { user } = useUser()
    const [allUsers, setAllUsers] = useState([]);

    console.log(user)

    useEffect(() => {
        // Get the token and user ID from the URL parameter
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');


        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setAllUsers(response.data.data.users);
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };
        fetchAllUsers()


        if (token && userId) {
            fetchMediaContent(user.token);
        }
    }, [location.search]); // Include location.search in the dependency array

    const fetchMediaContent = async (token) => {
        try {
            // Make a GET request to fetch media content with the token
            const response = await axios.get('http://localhost:3001/content', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set the media content state with the data received from the server
            console.log(response.data)
            setMediaContent(response.data);
        } catch (error) {
            console.error('Error fetching media content:', error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('content', file);
        formData.append('description', 'image desc'); // Set description
        formData.append('type', 'image'); // Set type

        try {
            // Get the token from the URL parameter
            const params = new URLSearchParams(location.search);
            const token = params.get('user.token');

            await axios.post('http://localhost:3001/content/upload', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Refresh media content after upload
            fetchMediaContent(token);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Define separate functions for liking and unliking
    const handleLike = async (contentId) => {
        try {
            // Get the token from the URL parameter
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            // Make a POST request to like the content
            await axios.post(`http://localhost:3001/content/${contentId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            // Update the media content state to mark it as liked
            const updatedMediaContent = mediaContent.map(content => {
                if (content._id === contentId) {
                    content.liked = true;
                    content.likes.push(user.id); // Add user to likes array
                }
                return content;
            });
            setMediaContent(updatedMediaContent);
        } catch (error) {
            console.error('Error liking content:', error);
        }
    };

    const handleUnlike = async (contentId) => {
        try {
            // Get the token from the URL parameter
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            // Make a POST request to unlike the content
            await axios.post(`http://localhost:3001/content/${contentId}/unlike`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            // Update the media content state to mark it as unliked
            const updatedMediaContent = mediaContent.map(content => {
                if (content._id === contentId) {
                    content.liked = false;
                    content.likes = content.likes.filter(id => id !== user.id); // Remove user from likes array
                }
                return content;
            });
            setMediaContent(updatedMediaContent);
        } catch (error) {
            console.error('Error unliking content:', error);
        }
    };


    return (
        <div className="content-page">
            {/* Display first name and last name */}
            <h1 className="welcome-message">Welcome, {user.firstName} {user.lastName}</h1>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-file" />
            <label htmlFor="upload-file" className="upload-button">Upload Media</label>
            <div className="media-container">
                {/* Map over the media content array and render images */}
                {mediaContent.map((content, index) => (
                    <div key={index} className="media-item">
                        {/* Find the corresponding user */}
                        {allUsers.map(user => {
                            if (user._id === content.user) {
                                return (
                                    <div key={user._id} className="uploaded-by">
                                        {/* Display first and last name */}
                                        {user.firstName} {user.lastName}
                                    </div>
                                );
                            }
                        })}
                        {/* Render images */}
                        <img src={content.url.split('?')[0]} alt={`Image ${index}`} className="image" />
                        {/* Display number of likes */}
                        <div className="like-count">Likes: {content.likes ? content.likes.length : 0}</div>
                        {content.likes && content.likes.includes(user.id) ? (
                            <button className="like-button" onClick={() => handleUnlike(content._id)}>
                                Unlike
                            </button>
                        ) : (
                            <button className="like-button" onClick={() => handleLike(content._id)}>
                                Like
                            </button>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );


}
export default ContentPage;
