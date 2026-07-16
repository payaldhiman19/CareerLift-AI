const Resume = require("../models/Resume");
const { matchResumeWithJD } = require("../services/geminiService");

const matchJobDescription = async (req, res) => {

    try {

        const { jobDescription } = req.body;

        if (!jobDescription) {

            return res.status(400).json({
                success: false,
                message: "Job description is required"
            });

        }

        const resume = await Resume.findById(req.params.id);

        if (!resume) {

            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });

        }

        const result = await matchResumeWithJD(
            resume.resumeText,
            jobDescription
        );

        res.status(200).json({
            success: true,
            result
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    matchJobDescription
};