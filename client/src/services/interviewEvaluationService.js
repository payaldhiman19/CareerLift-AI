import api from "./api";

export const evaluateAnswer = async (question, answer) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/interview/evaluate",
        {
            question,
            answer
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.result;

};