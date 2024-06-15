import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const DeleteQuestion = () => {
    const [questionid, setQuestionId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/delete-question/${questionid}`);
            setMessage(response.data.msg);
            // Optionally, clear the questionid state after successful deletion
            setQuestionId('');

            // Navigate to home page after deletion
            navigate('/');
        } catch (error) {
            setMessage(error.response.data.msg || 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Delete Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question ID:</label>
                    <input
                        type="text"
                        value={questionid}
                        onChange={(e) => setQuestionId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Delete Question</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteQuestion;
