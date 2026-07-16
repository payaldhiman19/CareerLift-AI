import api from "./api";
import { getMyResumes } from "./resumeService";
export const getDashboardStats = async () => {

    const data = await getMyResumes();

    const resumes = data.resumes;

    const totalResumes = resumes.length;

    const highestATS =
        resumes.length > 0
            ? Math.max(...resumes.map(r => r.atsScore || 0))
            : 0;

    const analyzed = resumes.filter(
        r => (r.atsScore || 0) > 0
    ).length;

    return {
        totalResumes,
        highestATS,
        analyzed
    };
};
export const getLatestResume = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/resume/latest", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.resume;
};