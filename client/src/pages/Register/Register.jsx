import { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

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
        <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        ref={username}
                        id="username"
                        placeholder="Username"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        ref={firstName}
                        id="firstName"
                        placeholder="First Name"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        ref={lastName}
                        id="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <br />
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
                <button type="submit">Register</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </section>
    );
}

export default Register;
