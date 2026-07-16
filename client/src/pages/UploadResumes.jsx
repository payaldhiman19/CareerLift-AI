import { useState } from "react";
import Navbar from "../components/Navbar";
import { uploadResume } from "../services/resumeService";

function UploadResume() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {
        alert("Please select a PDF.");
        return;
    }

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("resume", file);

        await uploadResume(formData);

        alert("Resume uploaded successfully!");

        setTitle("");
        setFile(null);

    } catch (error) {

        alert(error.response?.data?.message || "Upload failed");

    } finally {

        setLoading(false);

    }

};

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

                <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl">

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Upload Resume
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                        Upload your PDF resume and let AI analyze it.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>

                            <label className="font-semibold">
                                Resume Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded-lg p-3 mt-2"
                                placeholder="e.g. Software Engineer Resume"
                                required
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Resume (PDF)
                            </label>

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full border rounded-lg p-3 mt-2"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        >
                            {loading ? "Uploading..." : "Upload Resume"}
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default UploadResume;