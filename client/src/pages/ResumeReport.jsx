import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

function ResumeReport() {

    const { id } = useParams();

    const [resume, setResume] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/resume/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setResume(response.data.resume);

        } catch (error) {

            console.log(error);

        }

    };

    if (!resume) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
<>
<Navbar/>
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Resume Analysis Report
                </h1>

                <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                        ATS Score
                    </h2>

                    <div className="w-full bg-gray-300 rounded-full h-6 mt-3">

                        <div
                            className="bg-green-500 h-6 rounded-full text-white text-center"
                            style={{
                                width: `${resume.atsScore}%`
                            }}
                        >
                            {resume.atsScore}%
                        </div>

                    </div>

                </div>
  

                <div className="grid md:grid-cols-2 gap-8">

                    <div>

                        <h2 className="text-xl font-bold mb-3">
                            Skills
                        </h2>

                        <ul className="list-disc ml-5">

                            {resume.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}

                        </ul>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-3">
                            Missing Skills
                        </h2>

                        <ul className="list-disc ml-5">

                            {resume.missingSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}

                        </ul>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-3">
                            Strengths
                        </h2>

                        <ul className="list-disc ml-5">

                            {resume.strengths.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </ul>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-3">
                            Weaknesses
                        </h2>

                        <ul className="list-disc ml-5">

                            {resume.weaknesses.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </ul>

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-3">
                        Suggestions
                    </h2>

                    <ul className="list-disc ml-5">

                        {resume.suggestions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}

                    </ul>

                </div>
                  <div className="mt-10 flex justify-center">

    <Link
        to={`/interview/${resume._id}`}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
    >
        🎯 Generate Interview Questions
    </Link>

</div>
            </div>

        </div>
</>
    );

}

export default ResumeReport;