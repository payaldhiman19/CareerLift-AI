const Resume = require("../models/Resume");

const {
    generateInterviewQuestions,
    evaluateInterviewAnswer
} = require("../services/geminiService");


// Generate Interview Questions
const getInterviewQuestions = async (req, res) => {

    try {

        const { resumeId } = req.params;
        const role = req.query.role;

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const questions = await generateInterviewQuestions(
            resume.resumeText,
            role
        );

              console.log("Generated Questions:");
              console.log(questions);
        res.status(200).json({
            success: true,
            questions
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Evaluate Interview Answer
const evaluateAnswer = async (req, res) => {
    try {

        const { question, answer } = req.body;

        const result = await evaluateInterviewAnswer(question, answer);

        res.json({
            success: true,
            result
        });

    } catch (error) {

        console.log("Evaluation Error:", error);

        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                message: "Gemini quota exceeded."
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Start Interview
const startInterview = async (req, res) => {
    try {

        const {
            resumeId,
            targetRole
        } = req.body;

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const questions = await generateInterviewQuestions(
            resume.resumeText,
            targetRole
        );

        return res.status(200).json({
            success: true,
            questions
        });

    } catch (error) {

        console.error("Start Interview Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getInterviewQuestions,
    evaluateAnswer,
    startInterview
};