import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Register.module.css"

function Register() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        const usernameValue = username.current.value;
        const firstValue = firstName.current.value;
        const lastValue = lastName.current.value;
        const emailValue = email.current.value;
        const passValue = password.current.value;
        if (
            !usernameValue ||
            !firstValue ||
            !lastValue ||
            !emailValue ||
            !passValue
        ) {
            setErrorMessage("Please provide all fields");
            return;
        }
        try {
            await axios.post("/users/register", {
                username: usernameValue,
                firstname: firstValue,
                lastname: lastValue,
                email: emailValue,
                password: passValue,
            });
            navigate('/login', { state: { successMessage: "Registration successful! Please log in." } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        }
    }

    return (
        <LayOut>
            <div className={classes.register_container}>
                <p><span>Join the network</span></p>
                <p>Already have an account ? <Link className={classes.red} to={"/register"}>Signin</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className={classes.form_control}>
                        <input
                            className={`${classes.input_alt} ${classes.input}`}
                            type="text"
                            ref={username}
                            id="username"
                            placeholder="Username"
                        />
                        <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                    </div>
                    <br />
                    <div className={classes.name}>
                        <div className={classes.form_control}>
                            <input
                                className={`${classes.input_alt} ${classes.input}`}
                                type="text"
                                ref={firstName}
                                id="firstName"
                                placeholder="First Name"
                            />
                            <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                        </div>
                        <div className={classes.form_control}>
                            <input
                                className={`${classes.input_alt} ${classes.input}`}
                                type="text"
                                ref={lastName}
                                id="lastName"
                                placeholder="Last Name"
                            />
                            <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.form_control}>
                        <input
                            className={`${classes.input_alt} ${classes.input}`}
                            type="email"
                            ref={email}
                            id="email"
                            placeholder="Email"
                        />
                        <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                    </div>
                    <br />
                    <div className={classes.form_control}>
                        <input
                            className={`${classes.input_alt} ${classes.input}`}
                            type="password"
                            ref={password}
                            id="password"
                            placeholder="Password"
                        />
                        <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                    </div>
                    <br />
                    <p>I agree to the <span className={classes.red}>privacy policy</span>  and <span className={classes.red}>terms of service</span>.</p>
                    <br />
                    <button className={classes.btn} type="submit">Register</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </LayOut>

    );
}

export default Register;
