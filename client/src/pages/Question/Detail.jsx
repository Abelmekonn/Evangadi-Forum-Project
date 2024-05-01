// DetailQuestion.jsx

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

function DetailQuestion({ questionId }) {
    const [questionDetail, setQuestionDetail] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/questions/${questionId}`)
            .then((response) => {
                setQuestionDetail(response.data);
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
                    <h2>{questionDetail.title}</h2>
                    <p>{questionDetail.description}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
}

export default DetailQuestion;
