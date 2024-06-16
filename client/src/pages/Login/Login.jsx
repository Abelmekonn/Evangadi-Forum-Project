import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { ClipLoader } from "react-spinners";

function Login({ toggleForm }) {
    const [loading, setLoading] = useState(false); // State to manage loading
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
            // Start loading state
            setLoading(true);

            // Make a login request using Axios
            const response = await axios.post("/users/login", {
                email: emailValue,
                password: passwordValue,
            });

            // Assume the server returns a token upon successful login
            const token = response.data.token;

            // Save the token to local storage or session storage
            localStorage.setItem("token", token);

            // Redirect to a protected route or dashboard
            navigate("/");
        } catch (error) {
            // Handle login error
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        } finally {
            // Simulate a slight delay for visual feedback
            setTimeout(() => {
                // Stop loading state
                setLoading(false);
            }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
        }
    }

    return (
        <div className={classes.login_container}>
            <p>
                <span>Login to your account</span>
            </p>
            <p>
                Do not have an account?{" "}
                <span className={classes.red} onClick={toggleForm}>
                    Create a new account?
                </span>
            </p>
            <form className={classes.form_container} onSubmit={handleSubmit}>
                <input
                    className={`${classes.input_alt} ${classes.input}`}
                    type="email"
                    ref={email}
                    id="email"
                    placeholder="Email"
                />
                <br />
                <input
                    className={`${classes.input_alt} ${classes.input}`}
                    type="password"
                    ref={password}
                    id="password"
                    placeholder="Password"
                />
                <br />
                {/* Conditional rendering of ClipLoader inside the button */}
                <button className={classes.btn} type="submit" disabled={loading}>
                    {loading ? (
                        <ClipLoader color={"#fff"} loading={true} size={20} />
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
}

export default Login;
