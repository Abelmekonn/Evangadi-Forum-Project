const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {createAnswer,GetAnswersByQuestionId}  = require("../controller/answer")

router.post("/create", authMiddleware, createAnswer);

router.get('/all/:question_id',authMiddleware ,GetAnswersByQuestionId)

module.exports=router;
