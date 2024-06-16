import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./create.module.css"

const UpdateQuestion = () => {
    const { questionId } = useParams();
    const { state } = useLocation();
    const [questionDetail, setQuestionDetail] = useState(state.questionDetail || {});
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        // If questionDetail is not passed in state, fetch it from the API
        if (!state.questionDetail) {
            fetchQuestion();
        } else {
            // Set initial form values from questionDetail
            setTitle(questionDetail.title);
            setDescription(questionDetail.description);
            setTag(questionDetail.tag); // Assuming tags are stored as an array
        }
    }, [state.questionDetail]);

    const fetchQuestion = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/questions/detail/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data) && response.data.length > 0) {
                setQuestionDetail(response.data[0]); // Assuming you're expecting a single object
                setTitle(response.data[0].title);
                setDescription(response.data[0].description);
                setTag(response.data[0].tag.join(', ')); // Convert array to comma-separated string
            } else {
                setError("Invalid response: Expected an array with at least one item");
            }
        } catch (error) {
            setError("Failed to fetch question detail");
            console.error("Error fetching question detail:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/questions/update-question/${questionId}`, {
                title,
                description,
                tag: tag.split(',').map(item => item.trim()) // Convert comma-separated string to array
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(response.data.msg);
            navigate(`/question-detail/${questionId}`);
        } catch (error) {
            setMessage(error.response?.data?.msg || 'Something went wrong');
        }
    };

    return (
        <LayOut>
            <div className={classes.updateContainer}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <h4>Update Question</h4>
                    <div>
                        <label>Title :-</label>
                        <input className={classes.input}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Tag :-</label>
                        <input className={classes.input}
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description :-</label>
                        <textarea className={classes.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className={classes.submit_btn} type="submit"><span>Update Question</span></button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </LayOut>
    );
};

export default UpdateQuestion;
