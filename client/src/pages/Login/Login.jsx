import { useRef } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Login.module.css"
import LayOut from "../../Components/LayOut/LayOut";
function Login({ toggleForm }) {
    const navigate = useNavigate();

    const email = useRef();
    const password = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        if (!emailValue || !passwordValue) {
            alert("Please provide both email and password");
            return;
        }

        try {
            // Make a login request using Axios
            const response = await axios.post("/users/login", {
                email: emailValue,
                password: passwordValue
            });

            // Assume the server returns a token upon successful login
            const token = response.data.token;

            // Save the token to local storage or session storage
            localStorage.setItem("token", token);

            // Redirect to a protected route or dashboard
            navigate('/');
        } catch (error) {
            // Handle login error
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }
    }

    return (
        <div className={classes.login_container}>
            <p><span>Login to your account</span></p>
            <p>
                Do not have an account?{" "}
                <span className={classes.red} onClick={toggleForm}>
                    Create a new account?
                </span>
            </p>
            <form onSubmit={handleSubmit}>
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
                <button className={classes.btn} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
