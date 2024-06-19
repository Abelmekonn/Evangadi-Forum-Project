import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { ClipLoader } from "react-spinners";

function Login({ toggleForm }) {
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const loginData = { email: emailValue, password: passwordValue };
            
            const response = await axios.post("/users/login", loginData);

            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                alert("Login failed: " + (error.response.data.msg || "Please check your credentials."));
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("Login failed: No response from server.");
            } else {
                console.error("Error setting up request:", error.message);
                alert("Login failed: An error occurred.");
            }
        } finally {
            setLoading(false);
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
