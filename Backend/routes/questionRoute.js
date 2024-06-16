const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createQuestion, allQuestions, deleteQuestion, updateQuestion,getQuestionDetail } = require("../controller/question");

// use get for getting question detail
router.get('/detail/:questionId', authMiddleware ,getQuestionDetail);

// Use POST for creating a new question
router.post("/create-question", authMiddleware, createQuestion);

// Use GET for retrieving all questions
router.get("/all-questions", authMiddleware, allQuestions);

// Use POST for updating a question
router.post("/update-question/:questionId", authMiddleware, updateQuestion);

// Use POST for deleting a question
router.delete("/delete-question/:questionId", authMiddleware, deleteQuestion);

module.exports = router;