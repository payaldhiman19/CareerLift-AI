import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-indigo-600"
                >
                    CareerLift AI 🚀
                </Link>

                <div className="flex items-center gap-8">

                    <Link
                        to="/dashboard"
                        className="hover:text-indigo-600 font-medium"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/upload"
                        className="hover:text-indigo-600 font-medium"
                    >
                        Upload Resume
                    </Link>

                    <Link
                        to="/resumes"
                        className="hover:text-indigo-600 font-medium"
                    >
                        My Resumes
                    </Link>

                <Link
                    to="/ai-tools"
                    className="hover:text-indigo-600 transition"
                >
                    AI Tools
                </Link>
                    <div className="relative">

                        <button
                            onClick={() => setOpen(!open)}
                            className="font-semibold bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200"
                        >
                            👤 {user?.name} ▼
                        </button>

                        {open && (

                            <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg border">

                                <div className="p-4 border-b">

                                    <h3 className="font-semibold">
                                        {user?.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {user?.email}
                                    </p>

                                </div>

                                <Link
                                    to="/profile"
                                    className="block px-4 py-3 hover:bg-gray-100"
                                    onClick={() => setOpen(false)}
                                >
                                    👤 My Profile
                                </Link>

                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                                >
                                    🚪 Logout
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;