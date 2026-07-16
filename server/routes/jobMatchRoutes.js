const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    matchJobDescription
} = require("../controllers/jobMatchController");

router.post("/:id", protect, matchJobDescription);

module.exports = router;