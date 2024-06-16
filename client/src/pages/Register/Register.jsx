import { useRef, useState } from "react";
import axios from "../../utils/axios";
import classes from "./Register.module.css"

function Register({ toggleForm }) {
    const [errorMessage, setErrorMessage] = useState("");

    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    
        if (!passwordRegex.test(passValue)) {
            setErrorMessage("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
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
            console.log('Registration successful. Navigating to login page.');
            toggleForm();
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        }
    }
    

    return (
        <div className={classes.register_container}>
            <p><span>Join the network</span></p>
            <p>
                Already have an account ?{" "}
                <span className={classes.red} onClick={toggleForm}>
                    Signin
                </span>
            </p>
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
                <p>I agree to the <span className={classes.red}>privacy policy</span> and <span className={classes.red}>terms of service</span>.</p>
                <br />
                <button className={classes.btn} type="submit">Register</button>
                {errorMessage && <p className={classes.error_message}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Register;
