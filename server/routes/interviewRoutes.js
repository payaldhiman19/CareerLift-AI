const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    getInterviewQuestions,
    evaluateAnswer,
    startInterview
} = require("../controllers/interviewController");

// Start Interview
router.post(
    "/start",
    protect,
    startInterview
);

// Generate Interview Questions
router.get(
    "/questions/:resumeId",
    protect,
    getInterviewQuestions
);

// Evaluate Answer
router.post(
    "/evaluate",
    protect,
    evaluateAnswer
);

module.exports = router;