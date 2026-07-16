const express = require("express");
const router = express.Router();

const {
    generateIntroduction
} = require("../controllers/introductionController");

router.post("/generate/:resumeId", generateIntroduction);

module.exports = router;