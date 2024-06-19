import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import img from "../../assets/img/profile_icon.webp";
import classes from "./all.module.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Loader from '../../Components/Loader/Loader';

function All_question() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
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
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError("JWT token is missing");
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {error && <div>Error: {error}</div>}
                    <h3>Questions</h3>
                    <hr />
                    {questions.map(question => (
                        <div key={question.questionid} className={classes.question_container}>
                            <div className={classes.question}>
                                <div className={classes.profile}>
                                    <img src={img} alt="Profile" />
                                    <p>{question.username}</p>
                                </div>
                                <p>{question.title}</p>
                                <div className={classes.tagBox}>
                                    <p>Tags:</p>
                                    {(Array.isArray(question.tag) ? question.tag : [question.tag]).map((tag, index) => (
                                        <span key={index} className={classes.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <Link className={classes.link} to={`/question-detail/${question.questionid}`}>
                                <ChevronRightIcon />
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

export default All_question;
