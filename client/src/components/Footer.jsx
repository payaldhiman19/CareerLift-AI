import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

                <div>
                    <h2 className="text-2xl font-bold text-blue-400">
                        CareerForge AI
                    </h2>

                    <p className="mt-4 text-gray-300">
                        Build ATS-friendly resumes with AI-powered feedback,
                        improve your resume score, and increase your interview chances.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">

                        <li>
                            <Link to="/" className="hover:text-blue-400">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/login" className="hover:text-blue-400">
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register" className="hover:text-blue-400">
                                Register
                            </Link>
                        </li>

                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Contact
                    </h3>

                    <p className="text-gray-300">
                        support@careerforge.ai
                    </p>

                    <p className="text-gray-300 mt-2">
                        India
                    </p>

                </div>

            </div>

            <div className="border-t border-gray-700 py-5 text-center text-gray-400">

                © 2026 CareerForge AI. All rights reserved.

            </div>

        </footer>
    );
}

export default Footer;