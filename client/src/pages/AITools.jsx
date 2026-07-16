import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyResumes } from "../services/resumeService";
import Footer from "../components/Footer";

function AITools() {

    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState("");
    const [showInterviewForm, setShowInterviewForm] = useState(false);
    const [targetRole, setTargetRole] = useState("");

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const data = await getMyResumes();

            setResumes(data.resumes || []);

            if (data.resumes && data.resumes.length > 0) {
                setSelectedResume(data.resumes[0]._id);
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-4xl font-bold">
                        🤖 AI Career Tools
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Choose a resume and explore AI-powered career tools.
                    </p>


                    {/* Resume Selector */}

                    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

                        <h2 className="text-xl font-bold mb-4">
                            Select Resume
                        </h2>

                        <select
                            value={selectedResume}
                            onChange={(e)=>setSelectedResume(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >

                            {
                                resumes.length === 0 ? (
                                    <option>No Resume Found</option>
                                )
                                :
                                (
                                    resumes.map((resume)=>(
                                        <option 
                                            key={resume._id}
                                            value={resume._id}
                                        >
                                            {resume.title}
                                        </option>
                                    ))
                                )
                            }

                        </select>

                    </div>



                    {/* AI Tools Cards */}

                    <div className="grid md:grid-cols-2 gap-8 mt-10">


                        {/* Resume Match */}

                        <div className="bg-white rounded-xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold">
                                🎯 Resume vs Job Description
                            </h2>

                            <p className="text-gray-600 mt-3">
                                Compare your resume with job descriptions
                                and find missing skills.
                            </p>


                            <Link
                                to={`/job-match/${selectedResume}`}
                                className={`inline-block mt-6 px-5 py-3 rounded-lg text-white ${
                                    selectedResume
                                    ? "bg-indigo-600 hover:bg-indigo-700"
                                    : "bg-gray-400 pointer-events-none"
                                }`}
                            >
                                Open
                            </Link>

                        </div>



                        {/* Mock Interview */}

                        <div className="bg-white rounded-xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold">
                                🎤 AI Mock Interview
                            </h2>


                            <p className="text-gray-600 mt-3">
                                Generate resume-based interview questions.
                            </p>


                            <button
                                onClick={()=>setShowInterviewForm(true)}
                                disabled={!selectedResume}
                                className={`mt-6 px-5 py-3 rounded-lg text-white ${
                                    selectedResume
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Start Interview
                            </button>



                            {
                                showInterviewForm && (

                                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                                        <div className="bg-white p-8 rounded-xl w-96">

                                            <h2 className="text-xl font-bold">
                                                Start AI Mock Interview
                                            </h2>


                                            <input
                                                placeholder="Enter Target Role"
                                                value={targetRole}
                                                onChange={(e)=>setTargetRole(e.target.value)}
                                                className="border w-full p-3 mt-4 rounded"
                                            />


                                            <Link
                                                to={
                                                    `/interview/${selectedResume}?role=${encodeURIComponent(targetRole)}`
                                                }
                                                className="block mt-5 bg-green-600 text-white text-center p-3 rounded"
                                            >
                                                Start Interview
                                            </Link>


                                            <button
                                                onClick={()=>setShowInterviewForm(false)}
                                                className="mt-3 w-full border p-3 rounded"
                                            >
                                                Cancel
                                            </button>


                                        </div>

                                    </div>

                                )
                            }


                        </div>




                        {/* Resume Roast */}

                        <div className="bg-white rounded-xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold">
                                🔥 Resume Roast
                            </h2>


                            <p className="text-gray-600 mt-3">
                                Get AI feedback about your resume.
                            </p>


                            <button
                                onClick={()=>navigate(`/resume-roast/${selectedResume}`)}
                                disabled={!selectedResume}
                                className={`mt-6 px-5 py-3 rounded-lg text-white ${
                                    selectedResume
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400"
                                }`}
                            >
                                Roast My Resume
                            </button>

                        </div>




                        {/* Introduction Coach */}

                        <div className="bg-white rounded-xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold">
                                🎤 AI Introduction Coach
                            </h2>


                            <p className="text-gray-600 mt-3">
                                Create and improve your interview introduction.
                            </p>


                            <button
                                onClick={()=>navigate(`/introduction-coach/${selectedResume}`)}
                                disabled={!selectedResume}
                                className={`mt-6 px-5 py-3 rounded-lg text-white ${
                                    selectedResume
                                    ? "bg-purple-600 hover:bg-purple-700"
                                    : "bg-gray-400"
                                }`}
                            >
                                Generate Introduction
                            </button>


                        </div>


                    </div>


                </div>


                <Footer />


            </div>


        </>
    );
}


export default AITools;