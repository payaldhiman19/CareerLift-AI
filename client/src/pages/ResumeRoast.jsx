import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { roastResume } from "../services/resumeRoastService";

function ResumeRoast() {

    const { id: resumeId } = useParams();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleRoast = async () => {

        try {

            setLoading(true);

            const data = await roastResume(resumeId);

            setResult(data.result);

        } catch (error) {

            console.log(error);

            alert("Failed to roast resume");

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-5xl mx-auto">

                    <h1 className="text-4xl font-bold">
                        🔥 AI Resume Roast
                    </h1>

                    <p className="text-gray-600 mt-3">
                        Let AI review your resume like a recruiter.
                    </p>

                    <button
                        onClick={handleRoast}
                        disabled={loading}
                        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                    >
                        {loading ? "Roasting..." : "Roast My Resume"}
                    </button>

                  {result && (
    <div className="mt-10 space-y-6">

        {/* Overall Rating */}
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                ⭐ Overall Rating
            </h2>

            <p className="text-5xl mt-4 text-red-600 font-bold">
                {result.overallRating}/10
            </p>
        </div>

        {/* First Impression */}
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                👀 First Impression
            </h2>

            <p className="mt-3">
                {result.firstImpression}
            </p>
        </div>

        {/* AI Roast */}
        <div className="bg-yellow-100 shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                😂 AI Roast
            </h2>

            <p className="mt-3 text-lg">
                {result.roast}
            </p>
        </div>

        {/* Biggest Red Flag */}
        <div className="bg-red-100 shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                🚩 Biggest Red Flag
            </h2>

            <p className="mt-3 text-lg">
                {result.biggestRedFlag}
            </p>
        </div>

        {/* Recruiter Mood */}
        <div className="bg-blue-100 shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                😴 Recruiter Mood
            </h2>

            <p className="mt-3 text-2xl font-semibold">
                {result.recruiterMood}
            </p>
        </div>

        {/* Final Mic Drop */}
        <div className="bg-black text-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">
                🎤 Final Mic Drop
            </h2>

            <p className="mt-3 text-xl italic">
                "{result.finalMicDrop}"
            </p>
        </div>

    </div>
)}

            </div>
        </div>
    </>
);
}

export default ResumeRoast;