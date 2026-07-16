import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { analyzeResume } from "../services/resumeService";
import {
    getDashboardStats,
    getLatestResume,
} from "../services/dashboardService";
import { Link } from "react-router-dom";

function Dashboard() {
const [analyzing, setAnalyzing] = useState(false);
    const [stats, setStats] = useState({
        totalResumes: 0,
        highestATS: 0,
        analyzed: 0,
    });

    const [latestResume, setLatestResume] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const statsData = await getDashboardStats();
            setStats(statsData);

            try {

                const resume = await getLatestResume();
                setLatestResume(resume);

            } catch {

                setLatestResume(null);

            }

        } catch (error) {

            console.log(error);

        }

    };
const handleAnalyze = async () => {

    try {

        setAnalyzing(true);

        await analyzeResume(latestResume._id);

        alert("Resume analyzed successfully!");

        fetchDashboard();

    } catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Analysis failed"
        );

    } finally {

        setAnalyzing(false);

    }

};
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                <div className="max-w-7xl mx-auto px-6 py-8">

                    {/* Welcome */}

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold">
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Manage your resumes and improve your ATS score with AI.
                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <p className="text-gray-500 font-medium">
                                📄 Total Resumes
                            </p>

                            <h2 className="text-5xl font-bold text-indigo-600 mt-3">
                                {stats.totalResumes}
                            </h2>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <p className="text-gray-500 font-medium">
                                🎯 Highest ATS Score
                            </p>

                            <h2 className="text-5xl font-bold text-green-600 mt-3">
                                {stats.highestATS}%
                            </h2>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <p className="text-gray-500 font-medium">
                                🤖 AI Analyses
                            </p>

                            <h2 className="text-5xl font-bold text-purple-600 mt-3">
                                {stats.analyzed}
                            </h2>

                        </div>

                    </div>

                    {/* Resume + Recommendation */}

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <h2 className="text-2xl font-bold mb-5">
                                📄 Latest Resume
                            </h2>

                            {latestResume ? (
                                <>

                                    <h3 className="text-xl font-semibold">
                                        {latestResume.title}
                                    </h3>

                                    <p className="mt-4 text-lg">
                                        ATS Score :
                                        <span className="text-green-600 font-bold">
                                            {" "}
                                            {latestResume.atsScore}%
                                        </span>
                                    </p>

                                    <p className="text-gray-500 mt-2">
                                        Uploaded on{" "}
                                        {new Date(
                                            latestResume.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <Link
                                        to={`/report/${latestResume._id}`}
                                        className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                                    >
                                        View Report →
                                    </Link>

                                </>
                            ) : (

                                <p>No Resume Uploaded</p>

                            )}

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
    🤖 AI Career Recommendations
</h2>

<p className="text-gray-500 mb-6">
    Personalized suggestions generated from your resume.
</p>
                            {latestResume ? (

                               <div className="space-y-4">

    {latestResume?.suggestions
        ?.slice(0,5)
        .map((item,index)=>(
            <div
                key={index}
                className="flex items-start gap-3 border-b border-gray-200 pb-3"
            >

                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

                    <span className="text-green-600 font-bold">
                        ✓
                    </span>

                </div>

                <p className="text-gray-700 leading-7">

                    {item.replace(/\*\*/g,"")}

                </p>

            </div>
        ))}

</div>

                            ) : (

                                <p>No Recommendations Available</p>

                            )}

                        </div>

                    </div>

                    {/* Skills */}

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <h2 className="text-2xl font-bold mb-5">
                                ✅ Current Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">

                                {latestResume?.skills?.length > 0 ? (

                                    latestResume.skills
                                        .slice(0, 10)
                                        .map((skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>

                                        ))

                                ) : (

                                    <p>No Skills Found</p>

                                )}

                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <h2 className="text-2xl font-bold mb-5">
                                ❌ Missing Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">

                                {latestResume?.missingSkills?.length > 0 ? (

                                    latestResume.missingSkills
                                        .slice(0, 10)
                                        .map((skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>

                                        ))

                                ) : (

                                    <p>No Missing Skills</p>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );

}

export default Dashboard;