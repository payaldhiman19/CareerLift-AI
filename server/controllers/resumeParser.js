const pdfParse = require("pdf-parse");

const extractResumeText = async (pdfBuffer) => {
    try {
        const data = await pdfParse(pdfBuffer);

        return data.text;
    } catch (error) {
        throw new Error("Failed to extract resume text");
    }
};

module.exports = extractResumeText;