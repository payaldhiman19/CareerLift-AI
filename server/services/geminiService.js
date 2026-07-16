const{GoogleGenAI}=require('@google/genai');
const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});
const analyzeResume=async(resumeText)=>{
    const prompt=`You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use **.
Do NOT use headings.
Do NOT write long paragraphs.

Suggestions should:
- be short
- maximum 20 words
- one actionable improvement per suggestion

Return JSON exactly in this format:

{
  "atsScore": number,
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:

${resumeText}`;

for (let i = 0; i < 3; i++) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(text);

    } catch (error) {

        if (error.status === 503 && i < 2) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
        }

        throw error;
    }
}
};
const generateInterviewQuestions = async (resumeText,targetRole) => {

    const prompt = `
You are an expert Software Engineering interviewer.

Candidate Target Role:
${targetRole}

Based on the candidate resume and target role, generate interview questions.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanation.

{
  "technical": [],
  "projects": [],
  "hr": []
}

Generate:

- 10 technical questions related to the target role
- 5 project-based questions from the resume
- 5 HR questions suitable for a fresher

Resume:

${resumeText}
`;

    for (let i = 0; i < 3; i++) {

        try {

            const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
});

const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
console.log("Gemini Questions Response:");
console.log(text);

return JSON.parse(text);

        } catch (error) {

            if (error.status === 503 && i < 2) {

                await new Promise(resolve => setTimeout(resolve, 2000));

                continue;

            }

            throw error;

        }

    }

};
const matchResumeWithJD = async (resumeText, jobDescription) => {

    const prompt = `
You are an ATS and Recruitment Expert.

Compare the following Resume with the Job Description.

Return ONLY valid JSON.

Do not use markdown.
Do not use explanation.

Return exactly this format:

{
  "matchScore": number,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "improvements": []
}

Resume:

${resumeText}

Job Description:

${jobDescription}
`;

    for (let i = 0; i < 3; i++) {

        try {

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

           const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(text);

        } catch (error) {

            if (error.status === 503 && i < 2) {

                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;

            }

            throw error;

        }

    }

};
const evaluateInterviewAnswer = async (question, answer) => {

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Answer:
${answer}

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use code blocks.

Return EXACTLY this format:

{
  "technicalScore": 8,
  "communicationScore": 7,
  "confidenceScore": 8,
  "overallScore": 8,
  "feedback": "Overall feedback in 2-3 sentences.",
  "idealAnswer": "Write an ideal interview answer for this question.",
  "missingPoints": [
    "Missing point 1",
    "Missing point 2"
  ]
}
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


        return JSON.parse(text);

    } catch (error) {

        console.log("Evaluation Error:", error);

        throw error;
    }

};

const roastResume = async (resumeText) => {

    const prompt = `
You are an expert technical recruiter and resume reviewer.

Analyze the following resume.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use headings.
Do NOT write explanations outside JSON.

Format:

Return ONLY valid JSON in this exact format:

{
  "overallRating": number,
  "firstImpression": "...",
  "roast": "...",
  "biggestRedFlag": "...",
  "recruiterMood": "...",
  "finalMicDrop": "..."
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    let text = response.text;

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
};
module.exports = {
    analyzeResume,
    generateInterviewQuestions,
    matchResumeWithJD,
    evaluateInterviewAnswer,
    roastResume
};