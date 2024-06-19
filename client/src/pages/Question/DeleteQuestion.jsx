import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./create.module.css"

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
            if (!token) {
                setMessage('Authentication token is missing.');
                return;
            }
            
            await axios.delete(`/questions/delete-question/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Question successfully deleted');
            navigate('/'); // Navigate to homepage or another appropriate route after deletion
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
        <LayOut>
            <div className={classes.delete_container}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.warning}>
                        <h3>Are you sure you want to delete this question?</h3>
                    </div>
                    <button className={classes.deleteBtn} type="submit">Delete Question</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </LayOut>
    );
};

export default DeleteQuestion;
