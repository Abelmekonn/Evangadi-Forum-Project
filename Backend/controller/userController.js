const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Import database connection pool
const { dbConnectionPromise } = require('../db/dbConfig');

async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;

    try {
        // Validate required fields
        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fill all fields" });
        }

        // Check if user with the same username or email already exists
        const [existingUser] = await dbConnectionPromise.query(
            "SELECT username, userid FROM users WHERE username=? OR email=?", 
            [username, email]
        );
        if (existingUser.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already registered" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password should be at least 8 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        await dbConnectionPromise.query(
            "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", 
            [username, firstname, lastname, email, hashedPassword]
        );

        // Generate JWT token
        const payload = { username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return success response with token
        return res.status(StatusCodes.CREATED).json({ token });

    } catch (error) {
        console.error("Error in user registration:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all info" });
    }

    try {
        console.log("Received login request for email:", email);
        
        const [user] = await dbConnectionPromise.query("SELECT username, userid, password FROM users WHERE email = ?", [email]);

        if (user.length === 0) {
            console.log("User not found for email:", email);
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials" });
        }

        console.log("User found:", user);

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials" });
        }

        const { username, userid } = user[0];
        const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log("Login successful for user:", email);

        return res.status(StatusCodes.OK).json({ token, username, msg: "Successful login" });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}


async function checker(req, res) {
    const username = req.user.username
    const userid = req.user.userid
    res.status(StatusCodes.OK).json({ msg: "valid user", username, userid })
}


module.exports = {
    register,
    login,
    checker
};