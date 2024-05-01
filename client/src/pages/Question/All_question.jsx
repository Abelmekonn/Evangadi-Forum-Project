import React, { useEffect, useState } from 'react'
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function All_question() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get("/questions/all-questions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setQuestions(res.data);
                    } else {
                        setError("Invalid response: Expected an array");
                    }
                })
                .catch((err) => {
                    setError(err.message);
                });
        } else {
            // Handle case where token is missing
            setError("JWT token is missing");
        }
    }, []);

    return (
        <>
            {error && <div>Error: {error}</div>}
            <h2>All Questions</h2>
            {questions.map(question => (
                <div key={question.id}>
                    <Link to={`/questions/${question.questionid}`}>
                        <h3>{question.title}</h3>
                    </Link>
                    <p>Tag: {question.tag}</p>
                    <p>{question.username}</p>
                </div>
            ))}
        </>
    );
}

export default All_question

