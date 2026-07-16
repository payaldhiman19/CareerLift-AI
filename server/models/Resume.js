const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    resumeUrl: {
        type: String,
        required: true
    },

    resumeText: {
        type: String,
        default: ""
    },

    skills: [
        {
            type: String,
            trim: true
        }
    ],

    education: [
        {
            degree: {
                type: String,
                trim: true
            },
            college: {
                type: String,
                trim: true
            },
            year: {
                type: String
            }
        }
    ],

    experience: [
        {
            company: {
                type: String,
                trim: true
            },
            role: {
                type: String,
                trim: true
            },
            duration: {
                type: String
            }
        }
    ],

    projects: [
        {
            title: {
                type: String,
                trim: true
            },
            description: {
                type: String
            },
            technologies: [
                {
                    type: String
                }
            ]
        }
    ],

    atsScore: {
        type: Number,
        default: 0
    },

    strengths: [
        {
            type: String
        }
    ],

    weaknesses: [
        {
            type: String
        }
    ],

    missingSkills: [
        {
            type: String
        }
    ],

    suggestions: [
        {
            type: String
        }
    ],

    feedback: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Resume", resumeSchema);