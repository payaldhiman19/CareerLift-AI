import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getInterviewQuestions } from "../services/interviewService";
import { evaluateAnswer } from "../services/interviewEvaluationService";

function InterviewPreparation() {

    const { id } = useParams();
const [searchParams] = useSearchParams();

const role = searchParams.get("role");
    const [questions, setQuestions] = useState({
    technical: [],
    projects: [],
    hr: []
});

    const [loading, setLoading] = useState(true);

    const [selectedQuestion, setSelectedQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [evaluation, setEvaluation] = useState(null);

    const [loadingEvaluation, setLoadingEvaluation] = useState(false);

    useEffect(() => {
    if(id && role) {

        fetchQuestions();
    }
    }, [id,role]);

    const fetchQuestions = async () => {

        try {

            const data = await getInterviewQuestions(id,role);
            console.log("Questions API Response:", data);

            setQuestions({
              technical: data?.questions?.technical || [],
              projects: data?.questions?.projects || [],
              hr: data?.questions?.hr || []
              });

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleEvaluate = async () => {

    if (!selectedQuestion) {
        alert("Please select a question.");
        return;
    }

    if (!answer.trim()) {
        alert("Please write your answer.");
        return;
    }

    try {

        setLoadingEvaluation(true);

        const result = await evaluateAnswer(
            selectedQuestion,
            answer
        );

        //console.log("Evaluation Result:", result);

        setEvaluation(result);
       // console.log("After setEvaluation:", result);

    } catch (error) {

        console.log("Evaluation Error:", error);

        if (error.response) {
           // console.log("Server Response:", error.response.data);
            alert(error.response.data.message);
        } else {
            alert("Evaluation Failed");
        }

    } finally {

        setLoadingEvaluation(false);

    }

};

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="min-h-screen flex justify-center items-center text-2xl font-bold">

                    Generating Interview Questions...

                </div>

            </>

        );

    }
    //console.log("Current Evaluation State:", evaluation);
    return (
    <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    🎤 AI Mock Interview
                </h1>

                <p className="text-gray-600 mb-8">
                    Click any interview question, answer it, and let AI evaluate your response.
                </p>

                {/* Questions */}

                <div className="grid md:grid-cols-3 gap-6">

                    {/* Technical */}

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold text-blue-600 mb-5">
                            💻 Technical
                        </h2>

                        <ol className="list-decimal ml-5 space-y-3">

                            {questions.technical.map((question, index) => (

                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedQuestion(question);
                                        setAnswer("");
                                        setEvaluation(null);
                                    }}
                                    className="cursor-pointer hover:bg-blue-100 rounded p-2"
                                >
                                    {question}
                                </li>

                            ))}

                        </ol>

                    </div>

                    {/* Projects */}

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold text-green-600 mb-5">
                            🚀 Projects
                        </h2>

                        <ol className="list-decimal ml-5 space-y-3">

                            {questions.projects.map((question, index) => (

                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedQuestion(question);
                                        setAnswer("");
                                        setEvaluation(null);
                                    }}
                                    className="cursor-pointer hover:bg-green-100 rounded p-2"
                                >
                                    {question}
                                </li>

                            ))}

                        </ol>

                    </div>

                    {/* HR */}

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold text-purple-600 mb-5">
                            👨‍💼 HR
                        </h2>

                        <ol className="list-decimal ml-5 space-y-3">

                            {questions.hr.map((question, index) => (

                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedQuestion(question);
                                        setAnswer("");
                                        setEvaluation(null);
                                    }}
                                    className="cursor-pointer hover:bg-purple-100 rounded p-2"
                                >
                                    {question}
                                </li>

                            ))}

                        </ol>

                    </div>

                </div>

                {/* Answer Section */}

                {selectedQuestion && (

                    <div className="bg-white rounded-xl shadow p-8 mt-8">

                        <h2 className="text-2xl font-bold">
                            Selected Question
                        </h2>

                        <p className="mt-4 text-lg font-medium">
                            {selectedQuestion}
                        </p>

                        <textarea
                            rows={8}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full border rounded-lg mt-6 p-4"
                            placeholder="Write your answer here..."
                        />

                        <button
                            onClick={handleEvaluate}
                            disabled={loadingEvaluation}
                            className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                        >
                            {loadingEvaluation
                                ? "Evaluating..."
                                : "Evaluate Answer"}
                        </button>

                    </div>

                )}

                {/* Evaluation */}

                {evaluation && (

                    <div className="bg-white rounded-xl shadow p-8 mt-8">

                        <h2 className="text-3xl font-bold mb-6">
                            📊 AI Evaluation
                        </h2>

                        <div className="grid md:grid-cols-4 gap-6">

                            <div className="bg-green-50 rounded-lg p-4 text-center">

                                <p className="font-semibold">
                                    Technical
                                </p>

                                <h3 className="text-4xl font-bold text-green-600">
                                    {evaluation.technicalScore}/10
                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-lg p-4 text-center">

                                <p className="font-semibold">
                                    Communication
                                </p>

                                <h3 className="text-4xl font-bold text-blue-600">
                                    {evaluation.communicationScore}/10
                                </h3>

                            </div>

                            <div className="bg-purple-50 rounded-lg p-4 text-center">

                                <p className="font-semibold">
                                    Confidence
                                </p>

                                <h3 className="text-4xl font-bold text-purple-600">
                                    {evaluation.confidenceScore}/10
                                </h3>

                            </div>

                            <div className="bg-indigo-50 rounded-lg p-4 text-center">

                                <p className="font-semibold">
                                    Overall
                                </p>

                                <h3 className="text-4xl font-bold text-indigo-600">
                                    {evaluation.overallScore}/10
                                </h3>

                            </div>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-3">
                                💬 Feedback
                            </h3>

                            <p>
                                {evaluation.feedback}
                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-3">
                                ✅ Ideal Answer
                            </h3>

                            <p className="whitespace-pre-line">
                                {evaluation.idealAnswer}
                            </p>

                        </div>

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-3">
                                📌 Missing Points
                            </h3>

                            <ul className="list-disc ml-6 space-y-2">

                            {evaluation?.missingPoints?.map((point, index) => (
                                    <li key={index}>
                                        {point}
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

export default InterviewPreparation;