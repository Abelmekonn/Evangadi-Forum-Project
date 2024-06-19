import { useRef, useState, useContext } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { Appstate } from '../../App';
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./create.module.css";
import { ClipLoader } from "react-spinners";

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
    const [loading, setLoading] = useState(false); // State to manage loading state
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

        const questionid = generateQuestionId(8);

        try {
            setLoading(true); // Set loading state to true before making the API call
            const response = await axios.post("/questions/create-question", {
                questionid: questionid,
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
            navigate("/");
        } catch (error) {
            console.error("Error creating question:", error);
            if (error.response) {
                setErrorMessage(error.response.data.msg || "An error occurred");
            } else {
                setErrorMessage("An error occurred");
            }
        } finally {
            // Simulate a slight delay for visual feedback
            setTimeout(() => {
                setLoading(false);
            }, 1500); // Adjust the delay time as needed (1500ms = 1.5 seconds)
        }
    }

    return (
        <LayOut>
            <div className={classes.create_container}>
                <h4>Steps to write a good question</h4>
                <ul>
                    <li><p>Summarize your problem in one-line title.</p></li>
                    <li><p>Describe your problem in more detail.</p></li>
                    <li><p>Describe what you tried and what you expected to happen.</p></li>
                    <li><p>Review your question and post it to the site.</p></li>
                </ul>
                <form onSubmit={handleSubmit} >
                    <h4>Ask a public question</h4>
                    <Link to="/" className={classes.link}>Go to question page</Link>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <div>
                        <input className={classes.input}
                            type="text"
                            ref={titleRef}
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <input
                            className={classes.input}
                            type="text"
                            ref={tagRef}
                            placeholder='Tags (comma separated)'
                        />
                    </div>
                    <div>
                        <textarea
                            className={classes.input}
                            ref={descriptionRef}
                            placeholder="Description"
                        >
                        </textarea>
                    </div>
                    <button className={classes.submit_btn} type="submit" disabled={loading}>
                        {loading ? <ClipLoader color={"#fff"} loading={true} size={15} /> : <span>Post your question</span>}
                    </button>
                </form>
            </div>
        </LayOut>
    );
}

export default CreateQuestion;
