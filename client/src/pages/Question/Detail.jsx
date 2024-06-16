import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Appstate } from '../../App';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './detail.module.css';
import CreateAnswer from '../Answer/CreateAnswer';
import Answer from '../Answer/Answer';

function DetailQuestion() {
    const { questionId } = useParams();
    const [questionDetail, setQuestionDetail] = useState({});
    const [error, setError] = useState(null);
    const user = useContext(Appstate);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/questions/detail/${questionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setQuestionDetail(response.data[0]); // Assuming you're expecting a single object
                } else {
                    setError("Invalid response: Expected an array with at least one item");
                }
            } catch (error) {
                setError("Failed to fetch question detail");
                console.error("Error fetching question detail:", error);
            }
        };

        fetchQuestionDetail();
    }, [questionId]);

    const handleUpdateClick = () => {
        // Navigate to update page and pass questionDetail as state
        navigate(`/question-update/${questionId}`, { state: { questionDetail } });
    };
    const handleDeleteClick = () => {
        navigate(`/question-delete/${questionId}`);
    };

    return (
        <LayOut>
            <div className={classes.detail_container}>
                <h3>Question</h3>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <div className={classes.detail} key={questionDetail.questionid}>
                            <h4>Title : {questionDetail.title}</h4>
                            <p>Description : {questionDetail.description}</p>
                            <p>Tags : {questionDetail.tag}</p>
                            {/* Additional details */}
                        </div>
                        {questionDetail.username === user.user.username && (
                            <div>
                                <button className={`${classes.btn} ${classes.updateBtn}`} onClick={handleUpdateClick}>Update</button>
                                <button className={`${classes.btn} ${classes.deleteBtn}`} onClick={handleDeleteClick}>Delete</button>
                            </div>
                        )}
                    </div>
                )}
                <Answer questionId={questionId} />
                <CreateAnswer questionId={questionId} />
            </div>
        </LayOut>
    );
}

export default DetailQuestion;
