import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`/questions/detail/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (Array.isArray(res.data) && res.data.length > 0) {
                setQuestionDetail(res.data[0]); // Assuming you're expecting a single object
                console.log(res.data); // Log the received data
            } else {
                setError("Invalid response: Expected an array with at least one item");
            }
        })
        .catch((error) => {
            setError("Failed to fetch question detail");
            console.error("Error fetching question detail:", error);
        });
    }, [questionId]);

    return (
        <LayOut>
            <div className={classes.detail_container}>
                <h3>Question</h3>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <div className={classes.detail} key={questionDetail.questionid}>
                            <h4>{questionDetail.title}</h4>
                            <p>{questionDetail.description}</p>
                            {/* Additional details */}
                        </div>
                        {questionDetail.username === user.user.username && (
                            <div>
                                <button>Delete</button>
                                <button>Update</button>
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
