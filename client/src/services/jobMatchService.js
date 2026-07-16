import api from "./api";

export const matchJobDescription = async (resumeId, jobDescription) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        `/job-match/${resumeId}`,
        { jobDescription },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.result;
};