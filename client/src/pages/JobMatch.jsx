import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { matchJobDescription } from "../services/jobMatchService";

function JobMatch() {

    const { id } = useParams();
    

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {

        if (!jobDescription.trim()) {

            alert("Please paste a Job Description");

            return;

        }

        try {

            setLoading(true);

            const data = await matchJobDescription(id, jobDescription);

            setResult(data);

        } catch (error) {

            alert(error.response?.data?.message || "Analysis Failed");

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-6xl mx-auto">

                    <h1 className="text-4xl font-bold mb-2">
                        🎯 Resume vs Job Description
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Paste any job description and let AI compare it with your resume.
                    </p>

                    <div className="bg-white rounded-xl shadow p-6">

                        <textarea
                            rows={12}
                            placeholder="Paste Job Description here..."
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                        >
                            {loading
                                ? "Analyzing..."
                                : "Analyze Match"}
                        </button>

                    </div>

                    {result && (

                        <div className="mt-10">

                            {/* Score */}

                            <div className="bg-white rounded-xl shadow p-6">

                                <h2 className="text-2xl font-bold mb-5">
                                    🎯 Match Score
                                </h2>

                                <div className="w-full bg-gray-300 rounded-full h-6">

                                    <div
                                        className="bg-green-500 h-6 rounded-full text-center text-white"
                                        style={{
                                            width: `${result.matchScore}%`
                                        }}
                                    >
                                        {result.matchScore}%
                                    </div>

                                </div>

                            </div>

                            {/* Skills */}

                            <div className="grid md:grid-cols-2 gap-6 mt-6">

                                <div className="bg-white rounded-xl shadow p-6">

                                    <h2 className="text-xl font-bold mb-4">
                                        ✅ Matching Skills
                                    </h2>

                                    <div className="flex flex-wrap gap-2">

                                        {result.matchedSkills.map((skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                    </div>

                                </div>

                                <div className="bg-white rounded-xl shadow p-6">

                                    <h2 className="text-xl font-bold mb-4">
                                        ❌ Missing Skills
                                    </h2>

                                    <div className="flex flex-wrap gap-2">

                                        {result.missingSkills.map((skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                    </div>

                                </div>

                            </div>

                            {/* Strengths */}

                            <div className="bg-white rounded-xl shadow p-6 mt-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    💪 Strengths
                                </h2>

                                <ul className="list-disc ml-5">

                                    {result.strengths.map((item, index) => (

                                        <li key={index}>
                                            {item}
                                        </li>

                                    ))}

                                </ul>

                            </div>

                            {/* Improvements */}

                            <div className="bg-white rounded-xl shadow p-6 mt-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    🚀 Improvements
                                </h2>

                                <ul className="list-disc ml-5">

                                    {result.improvements.map((item, index) => (

                                        <li key={index}>
                                            {item}
                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </>
    );

}

export default JobMatch;