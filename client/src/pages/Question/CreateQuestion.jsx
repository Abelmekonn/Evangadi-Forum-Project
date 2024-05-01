import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Appstate } from '../../App';

function generateQuestionId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let questionId = '';
    for (let i = 0; i < length; i++) {
        questionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return questionId;
}

function CreateQuestion() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const user = useContext(Appstate);
    const navigate = useNavigate();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const tagRef = useRef();
    const userId = user.user.userid;
    const token = localStorage.getItem('token'); 

    async function handleSubmit(e) {
        e.preventDefault();

        const titleValue = titleRef.current.value;
        const descValue = descriptionRef.current.value;
        const tagValue = tagRef.current.value;
        
        if (!titleValue || !descValue || !tagValue) {
            return setErrorMessage("All fields are required");
        }

        const questionid = generateQuestionId(8); // Generate a random 8-character questionid

        try {
            await axios.post("/questions/create-question", {
                questionid: questionid, // Include the generated questionid in the request
                userid: userId,
                title: titleValue,
                description: descValue,
                tag: tagValue.split(",").map(item => item.trim())
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage("Question submitted successfully!");
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Create New Question</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" ref={titleRef} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea ref={descriptionRef}></textarea>
                </div>
                <div>
                    <label>Tags:</label>
                    <input type="text" ref={tagRef} />
                    <small>Enter tags separated by commas</small>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateQuestion;
