import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">

        <h1 className="text-3xl font-bold text-blue-600">
          CareerForge AI
        </h1>

        <div className="space-x-4">

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>

             <Link
    to="/profile"
    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
>
    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {user?.name?.charAt(0).toUpperCase()}
    </div>

    <span className="font-medium">
        {user?.name}
    </span>
</Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </nav>

      {/* Hero */}

      <section className="text-center py-24 px-6">

        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
          Build an ATS Friendly Resume
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">

          Upload your resume, get AI-powered feedback, improve your ATS score,
          discover missing skills, and become interview ready.

        </p>

        <div className="mt-10">

          {token ? (
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700"
            >
              Upload Resume
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700 mr-5"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
            </>
          )}

        </div>

      </section>

      {/* Features */}

      <section className="grid md:grid-cols-4 gap-8 px-10">

        <div className="bg-white shadow-lg rounded-xl p-8 text-center">

          <div className="text-5xl">
            📄
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Resume Upload
          </h2>

          <p className="mt-2 text-gray-600">
            Upload your resume securely.
          </p>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 text-center">

          <div className="text-5xl">
            🤖
          </div>

          <h2 className="mt-4 text-xl font-bold">
            AI Analysis
          </h2>

          <p className="mt-2 text-gray-600">
            Gemini AI analyzes your resume.
          </p>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 text-center">

          <div className="text-5xl">
            📊
          </div>

          <h2 className="mt-4 text-xl font-bold">
            ATS Score
          </h2>

          <p className="mt-2 text-gray-600">
            Improve your ATS compatibility.
          </p>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 text-center">

          <div className="text-5xl">
            💼
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Career Guidance
          </h2>

          <p className="mt-2 text-gray-600">
            Personalized suggestions for better opportunities.
          </p>

        </div>

      </section>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto py-24 px-10">

        <h2 className="text-4xl font-bold text-center mb-14">

          How It Works

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <div className="text-5xl">
              📄
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Upload Resume
            </h3>

            <p className="text-gray-600 mt-3">
              Upload your PDF resume in seconds.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <div className="text-5xl">
              🤖
            </div>

            <h3 className="text-2xl font-bold mt-5">
              AI Analysis
            </h3>

            <p className="text-gray-600 mt-3">
              Gemini AI evaluates your resume and identifies strengths and weaknesses.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <div className="text-5xl">
              🚀
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Improve Resume
            </h3>

            <p className="text-gray-600 mt-3">
              Follow AI suggestions to improve your ATS score.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">

          Ready to Improve Your Resume?

        </h2>

        <p className="mt-5 text-xl">

          Join CareerForge AI and build a stronger resume today.

        </p>

        {!token && (
          <Link
            to="/register"
            className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
        )}

      </section>

      <Footer />

    </div>
  );
}

export default Home;