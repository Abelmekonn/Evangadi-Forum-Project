const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {createAnswer}  = require("../controller/answer")

router.post("/create", authMiddleware, createAnswer);

module.exports=router;
