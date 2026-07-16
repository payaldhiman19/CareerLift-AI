import {useState} from "react";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {generateIntroduction} from "../services/introductionService";


function IntroductionCoach(){

const {id}=useParams();

const [data,setData]=useState(null);
const [loading,setLoading]=useState(false);


const generate=async()=>{

try{

setLoading(true);

const result =
await generateIntroduction(id);

setData(result.introduction);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



return(
<>

<Navbar/>

<div className="min-h-screen bg-gray-100 p-10">


<div className="max-w-4xl mx-auto">


<h1 className="text-4xl font-bold">
🎤 AI Introduction Coach
</h1>


<p className="text-gray-600 mt-3">
Generate your personalized Tell Me About Yourself answer.
</p>



<button

onClick={generate}

className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"

>

{
loading
?
"🤖 AI is preparing your introduction..."
:
"Generate Introduction"
}

</button>



{
data &&

<div className="mt-8 space-y-5">


<Card
title="30 Seconds Introduction"
text={data.thirtySecond}
/>


<Card
title="1 Minute Introduction"
text={data.oneMinute}
/>


<Card
title="Technical Round Introduction"
text={data.technicalRound}
/>


<Card
title="HR Round Introduction"
text={data.hrRound}
/>



</div>

}


</div>

</div>


<Footer/>

</>

);

}



function Card({title,text}){

return(

<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-bold">
{title}
</h2>


<p className="mt-3 text-gray-700 whitespace-pre-line">
{text}
</p>


</div>

)

}


export default IntroductionCoach;