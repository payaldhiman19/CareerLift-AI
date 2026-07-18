import api from "./api";


export const generateIntroduction = async(resumeId)=>{

    const response = await axios.post(
        `http://localhost:5000/api/introduction/generate/${resumeId}`,
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