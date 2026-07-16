const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
    
    uploadResume,
    createResume,
    getMyResumes,
    updateResume,
    deleteResume,
    getResumeById,
    analyzeResumeAI,
    getLatestResume
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");
router.post(
    "/upload",
    protect,
    upload.single("resume"),  //only one file3
    
    uploadResume
);
router.post(
    "/analyze/:id",
    protect,
    analyzeResumeAI
);
router.get("/latest", protect, getLatestResume);
router.post("/", protect, createResume);
router.get("/:id", protect, getResumeById);
router.get("/", protect, getMyResumes);

router.put("/:id", protect, updateResume);

router.delete("/:id", protect, deleteResume);

module.exports = router;