import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteQuestion = () => {
    const { questionId } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to delete a question');
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
             // Debug statement
            if (!token) {
                setMessage('Authentication token is missing.');
                return;
            }

            await axios.post(`/questions/delete-question/${questionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("deleted")
            navigate('/');
        } catch (error) {
            console.error('Delete question error:', error);
            if (error.response && error.response.status === 401) {
                setMessage('Unauthorized: Please log in and try again.');
            } else {
                setMessage(error.response?.data?.msg || 'Something went wrong');
            }
        }
    };

    return (
        <div>
            <h2>Delete Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Are you sure you want to delete this question?</label>
                </div>
                <button type="submit">Delete Question</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteQuestion;
