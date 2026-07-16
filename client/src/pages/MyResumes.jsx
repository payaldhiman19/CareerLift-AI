import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyResumes, analyzeResume } from "../services/resumeService";
import Navbar from "../components/Navbar";

function MyResumes() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const data = await getMyResumes();
            setResumes(data.resumes);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAnalyze = async (id) => {
    try {
        const data = await analyzeResume(id);
        console.log("Analyze response:", data);

        alert("Resume analyzed successfully!");
        fetchResumes();

    } catch (error) {
        console.log("Analyze error:", error.response?.data);
    }
};

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-2">
                My Resumes 📂
            </h1>

            <div className="grid gap-4">
                {resumes.length === 0 ? (
                    <p>No resumes uploaded yet</p>
                ) : (
                    resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-bold">
                                {resume.title}
                            </h2>

                            <p className="text-gray-600">
                                ATS Score: {resume.atsScore || 0}
                            </p>

                            <p className="text-sm text-gray-500">
                                Uploaded:{" "}
                                {new Date(resume.createdAt).toLocaleDateString()}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => handleAnalyze(resume._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Analyze
                                </button>

                                <Link
                                    to={`/report/${resume._id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    View Report
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
}

export default MyResumes;