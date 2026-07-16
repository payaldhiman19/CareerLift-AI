const pdfParse = require("pdf-parse");

const extractResumeText = async (pdfBuffer) => {
    const data = await pdfParse(pdfBuffer);
    return data.text;
};

module.exports = extractResumeText;