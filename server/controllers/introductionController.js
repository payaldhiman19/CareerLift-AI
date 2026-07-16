const Resume = require("../models/Resume");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


const generateIntroduction = async(req,res)=>{

    try{

        const {resumeId}=req.params;


        const resume = await Resume.findById(resumeId);


        if(!resume){
            return res.status(404).json({
                message:"Resume not found"
            });
        }


        const model = genAI.getGenerativeModel({
            model:"gemini-2.5-flash"
        });


        const prompt = `

You are an expert interview coach.

Create a personalized "Tell me about yourself"
answer for a fresher software engineer.

Resume Details:

${resume.content}


Generate ONLY JSON:

{
"thirtySecond":"",
"oneMinute":"",
"technicalRound":"",
"hrRound":""
}

Rules:
- Keep language simple
- Do not add fake experience
- Highlight projects and skills
- Fresher friendly

`;



        const result = await model.generateContent(prompt);


        const response =
        result.response.text();


        const cleaned =
        response.replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();


        const introduction =
        JSON.parse(cleaned);



        res.json({
            success:true,
            introduction
        });



    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to generate introduction"
        });

    }

};


module.exports={
    generateIntroduction
};