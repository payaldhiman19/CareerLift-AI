import api from "./api";

export const uploadResume = async (formData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/resume/upload",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getMyResumes = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/resume", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const analyzeResume = async (id) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        `/resume/analyze/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};