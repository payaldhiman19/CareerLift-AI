import api from "./api";


export const generateIntroduction = async(resumeId)=>{

    const response = await api.post(
        `introduction/generate/${resumeId}`,
        {},
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );


    return response.data;

};