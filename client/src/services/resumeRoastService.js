import api from "./api";

export const roastResume = async (resumeId) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/roast",
        {
            resumeId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};