import api from "./api";

export const getInterviewQuestions = async (id, role) => {

    const token = localStorage.getItem("token");

const response = await api.get(`/interview/questions/${id}?role=${role}`, {
            headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;

};
export const startInterview = async(data)=>{

const token=localStorage.getItem("token");


const response = await api.post(
    "/interview/start",
    data,
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);


return response.data;
};