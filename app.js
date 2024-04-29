require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

// Import db connection
const { dbConnectionPool, dbConnectionPromise } = require('./db/dbConfig');
const userRouter = require('./routes/userRoute');

app.use(express.json())

app.use("/api/users", userRouter);

async function first() {
    try {
        // Use the promise for executing queries
        await app.listen(port);
        console.log(`Listening on ${port}`)
    } catch (error) {
        console.log(error);
    }
}

first();

