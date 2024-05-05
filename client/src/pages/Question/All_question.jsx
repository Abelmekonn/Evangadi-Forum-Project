import React, { useEffect, useState } from 'react'
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/img/profile_icon.webp"
import classes from "./all.module.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
            <h3> Questions</h3>
            <hr />
            {questions.map(question => (
                <div key={question.id} className={classes.question_container}>
                    <div className={classes.question}>
                        <div className={classes.profile}>
                            <img src={img} alt="" />
                            <p>{question.username}</p>
                        </div>
                        <p>{question.title}</p>
                        <p>Tag: {question.tag}</p>
                    </div>
                    <Link className={classes.link} to={`/question-detail/${question.questionid}`}>
                        <ChevronRightIcon />
                    </Link>
                </div>
            ))}
        </>
    );
}

export default All_question

