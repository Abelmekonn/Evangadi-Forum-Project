import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import classes from "./answer.module.css"
import img from "../../assets/img/profile_icon.webp"


function Answer({ questionId }) {
    const [answers, setAnswer] = useState([]);
    const [error, setError] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`/answers/all/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (Array.isArray(res.data)) {
                    setAnswer(res.data)
                } else {
                    setError("No Answers Yet")
                }
            })
        }
    }, [questionId]); // Adding questionId as a dependency to useEffect

    return (
        <div className={classes.answer_container}>
            <h3>Answer From The Community</h3>
            <hr />
            {answers?.map(answer => (
                <div className={classes.answer} key={answer.answerid}>
                    <div className={classes.profile}>
                            <img src={img} alt="" />
                            <p>{answer.username}</p>
                        </div>
                    <p>{answer.answer}</p>
                </div>
            ))}
        </div>
    )
}

export default Answer;
