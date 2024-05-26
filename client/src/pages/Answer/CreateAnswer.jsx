import { useRef, useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useContext } from 'react';
import { Appstate } from '../../App';
import { Link } from "react-router-dom";
import classes from './create.module.css'

function CreateAnswer({ questionId }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const answerRef = useRef()
    const user = useContext(Appstate);
    const userId = user.user.userid;
    const token = localStorage.getItem('token');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    async function handleSubmit(e) {
        e.preventDefault();
        const answers = answerRef.current.value;
        if (!answers) {
            return setErrorMessage("Fill Answer filed ");
        }
        try {
            await axios.post(`/answer/create`, {
                answer: answers,
                userid: userId,
                questionid: questionId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            answerRef.current.value = "";
            setSuccessMessage("Answer posted successfully!");
            window.location.reload();
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={classes.create_answer}>
            <form action="" method="post" onSubmit={handleSubmit}>
                <h4>Answer the top questions</h4>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <Link className={classes.link}>Go to question part</Link>
                <textarea
                    type="text"
                    placeholder="your answer"
                    ref={answerRef} ></textarea>
                <div>
                    <button className={classes.submit_btn} type="submit">Post your answer</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAnswer