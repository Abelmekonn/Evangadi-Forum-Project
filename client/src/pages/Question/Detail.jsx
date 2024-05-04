import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom'; // Import useParams
import CreateAnswer from '../Answer/CreateAnswer';
import Answer from '../Answer/Answer';

function DetailQuestion() {
    const { questionId } = useParams(); // Get the questionId from useParams
    const [questionDetail, setQuestionDetail] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`/questions/detail/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (Array.isArray(res.data)) {
                setQuestionDetail(res.data);
                console.log(res.data); // Log the received data
            } else {
                setError("Invalid response: Expected an array");
            }
        })
        .catch((error) => {
            setError("Failed to fetch question detail");
            console.error("Error fetching question detail:", error);
        });
    }, [questionId]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {questionDetail.map((question) => (
                        <div key={question.questionid}>
                            <h2>{question.title}</h2>
                            <p>{question.description}</p>
                            <b>Asked by: {question.username}</b><br />
                            {/* Add more details as needed */}
                        </div>
                    ))}
                </div>
            )}
            <Answer questionId={questionId} />
            <CreateAnswer questionId={questionId} />
        </div>
    );
}

export default DetailQuestion;
