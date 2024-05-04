import { useRef } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {} from "./Login.module.css"

function Login() {
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
        <div >
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        ref={email}
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        ref={password}
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
            <Link to={"/register"} >register</Link>
        </div>
    );
}

export default Login;
