const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { resumeRoast } = require("../controllers/roastController");

router.post(
    "/",
    protect,
    resumeRoast
);

module.exports = router;