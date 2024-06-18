import React, { useState } from "react";
import axios from "../../utils/axios";
import { ClipLoader } from "react-spinners";
import classes from "./Register.module.css";

const Register = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { username, firstName, lastName, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !firstName || !lastName || !email || !password) {
            setErrorMessage("Please provide all fields");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage(
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
            );
            return;
        }

        try {
            setLoading(true);
            await axios.post("/users/register", {
                username,
                firstname: firstName,
                lastname: lastName,
                email,
                password,
            });
            console.log("Registration successful. Navigating to login page.");
            toggleForm();
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data && error.response.data.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classes.register_container}>
            <p>
                <span>Join the network</span>
            </p>
            <p>
                Already have an account ?{" "}
                <span className={classes.red} onClick={toggleForm}>
                    Signin
                </span>
            </p>
            <form className={classes.form_container} onSubmit={handleSubmit}>
                <div className={classes.form_control}>
                    <input
                        className={`${classes.input_alt} ${classes.input}`}
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
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
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                    </div>
                    <div className={classes.form_control}>
                        <input
                            className={`${classes.input_alt} ${classes.input}`}
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
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
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                </div>
                <br />
                <div className={classes.form_control}>
                    <input
                        className={`${classes.input_alt} ${classes.input}`}
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <span className={`${classes.inputBorder} ${classes.inputBorderAlt}`}></span>
                </div>
                <br />
                <p>
                    I agree to the <span className={classes.red}>privacy policy</span> and{" "}
                    <span className={classes.red}>terms of service</span>.
                </p>
                <br />
                <button className={classes.btn} type="submit" disabled={loading}>
                    {loading ? (
                        <ClipLoader color={"#fff"} loading={true} size={20} />
                    ) : (
                        "Register"
                    )}
                </button>
                {errorMessage && <p className={classes.error_message}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
