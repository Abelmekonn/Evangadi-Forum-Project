const { StatusCodes } = require("http-status-codes"); // Corrected import

const { dbConnectionPool, dbConnectionPromise } = require('../db/dbConfig');
async function createAnswer(req,res){
    const {userid,questionid,answer}=req.body;
    if (!userid || !questionid ||!answer){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all information" });
    }
    try {
        const query="TNSERT INTO answer (userid,questionid,answer) VALUE (?,?,?)"
        const result=await dbConnectionPromise.query(query,[userid,questionid,answer]);
        if (result) {
            return res.status(StatusCodes.CREATED).json({ msg: "Question created successfully" });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to create question" });
        }
    } catch (error) {
        console.error("Error creating question:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}