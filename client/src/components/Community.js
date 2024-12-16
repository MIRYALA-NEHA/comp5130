import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Community.css';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL+'/posts');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        if (!newPost.trim()) return;
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+'/posts/create', {
                author: 'Anonymous', // Replace with actual user data
                content: newPost,
            });
            setPosts([response.data.post, ...posts]); // Add new post to the top
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            const response = await axios.patch(`http://localhost:8000/posts/${postId}/like`);
            setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="community-container">
            <h1>Community</h1>
            <div className="create-post">
                <textarea
                    placeholder="Share your thoughts..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={handleCreatePost}>Post</button>
            </div>
            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <h3>{post.author}</h3>
                        <p>{post.content}</p>
                        <div className="post-actions">
                            <span>{post.likes} Likes</span>
                            <button onClick={() => handleLikePost(post._id)}>Like</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
