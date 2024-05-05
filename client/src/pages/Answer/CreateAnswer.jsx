import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Appstate } from '../../App';
import { Link } from "react-router-dom";
import classes from './create.module.css'

function CreateAnswer({ questionId }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate=useNavigate()
    const answerRef=useRef()
    const user = useContext(Appstate);
    const userId = user.user.userid;
    const token = localStorage.getItem('token'); 


    async function handleSubmit(e){
        e.preventDefault();
        const answers=answerRef.current.value;
        if (!answers){
            return setErrorMessage("Answer filed error");
        }
        try {
            await axios.post(`/answer/create`,{
                answer:answers,
                userid:userId,
                questionid:questionId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={classes.create_answer}>
            <h4>Answer the top questions</h4>
            <Link className={classes.link}>Go to question part</Link>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                    <input type="text" ref={answerRef} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateAnswer