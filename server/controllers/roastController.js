const Resume = require("../models/Resume");
const { roastResume } = require("../services/geminiService");

const resumeRoast = async (req, res) => {
    try {

        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: "Resume ID is required"
            });
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const result = await roastResume(resume.resumeText);

        return res.status(200).json({
            success: true,
            result
        });

    } catch (error) {

        console.log(error);

        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                message: "Gemini API quota exceeded. Please try again later."
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });

    }
};

module.exports = {
    resumeRoast
};