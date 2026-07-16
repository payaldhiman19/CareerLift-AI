const Resume=require("../models/Resume");
//create resume
const { analyzeResume } = require("../services/geminiService");
const extractResumeText = require("../services/pdfParser");


const createResume=async(req,res)=>{
 try{
    const resume=await Resume.create({
        user:req.user.id,
        title:req.body.title,
         resumeUrl: req.body.resumeUrl,
         skills: req.body.skills,
         education: req.body.education,
         experience: req.body.experience,
         projects: req.body.projects
    });
   res.status(201).json({
            success: true,
            message: "Resume created successfully",
            resume
        }); 
 }catch(error){
    res.status(500).json({success:false,message:error.message});
 }
};
//get logged in useer resume
const getMyResumes=async(req,res)=>{
    try{
        const resumes=await Resume.find({user:req.user.id});
        res.status(200).json({success:true,resumes});
    }catch(error){
       res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
};
//update resume
const updateResume = async (req, res) => {
    try {

        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            resume
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Resume
const deleteResume = async (req, res) => {
    try {

        const resume = await Resume.findByIdAndDelete(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });
        }

        // Extract text from PDF
        const resumeText = await extractResumeText(req.file.buffer);

        // Save to MongoDB
        const resume = await Resume.create({
            user: req.user._id,
            title: req.body.title,
            resumeUrl: req.file.originalname,
            resumeText
       });

        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resume
        });

    }catch (error) {

    console.error("UPLOAD ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};
const analyzeResumeAI = async (req, res) => {
    try {

        // Find the resume by ID
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // Check if resume text exists
        if (!resume.resumeText) {
            return res.status(400).json({
                success: false,
                message: "Resume text not found"
            });
        }

        // Send resume text to Gemini
        const result = await analyzeResume(resume.resumeText);

        // Save AI results
        resume.atsScore = result.atsScore;
        resume.skills = result.skills;
        resume.missingSkills = result.missingSkills;
        resume.strengths = result.strengths;
        resume.weaknesses = result.weaknesses;
        resume.suggestions = result.suggestions;
        resume.feedback = result.suggestions.join("\n");

        await resume.save();

        res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            analysis: resume
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getResumeById = async (req, res) => {

    try {

        const resume = await Resume.findById(req.params.id);

        if (!resume) {

            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });

        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Get latest analyzed resume
const getLatestResume = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.id
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "No resumes found"
            });
        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    uploadResume,
    createResume,
    getMyResumes,
    updateResume,
    deleteResume,
    getResumeById,
    getLatestResume,
    analyzeResumeAI
};