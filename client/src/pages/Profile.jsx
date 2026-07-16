import { useEffect, useState } from "react";
import { getLatestResume, getDashboardStats } from "../services/dashboardService";
function Profile() {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    resumeCount: 0,
    atsScore: "Not Analyzed",
    skills: 0
  });


useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);


    const fetchProfileData = async () => {

        try {

            const stats = await getDashboardStats();

            const latestResume = await getLatestResume();


            setStats({

                resumeCount: stats.totalResumes,


                atsScore:
                    latestResume?.atsScore
                    ? `${latestResume.atsScore}%`
                    : "Not Analyzed",


                skills:
                    latestResume?.skills?.length || 0

            });


        } catch(error) {

            console.log("Profile error:", error);

        }

    };


    fetchProfileData();


}, []);


  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h2 className="text-xl font-semibold">
          Please login to view profile
        </h2>

      </div>

    );

  }






  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-5xl mx-auto space-y-6">





        {/* Profile Header */}

        <div className="bg-white rounded-xl shadow p-8 flex items-center gap-6">


          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

            {user.name?.charAt(0).toUpperCase()}

          </div>



          <div>

            <h1 className="text-3xl font-bold text-gray-800">

              {user.name}

            </h1>



            <p className="text-gray-500">

              {user.email}

            </p>



            <p className="text-blue-600 font-medium mt-2">

              Aspiring Software Engineer

            </p>


          </div>


        </div>








        {/* Career Progress */}

        <div className="bg-white rounded-xl shadow p-8">


          <h2 className="text-2xl font-bold mb-6">

            Career Progress

          </h2>



          <div className="grid md:grid-cols-3 gap-5">



            <StatCard
              title="Resume Analysis"
              value={stats.resumeCount}
              description="Uploaded resumes"
            />



            <StatCard
              title="ATS Score"
              value={stats.atsScore}
              description="Latest analysis"
            />



            <StatCard
              title="Skills Detected"
              value={stats.skills}
              description="From resume"
            />



          </div>


        </div>








        {/* AI Journey */}

        <div className="bg-white rounded-xl shadow p-8">


          <h2 className="text-2xl font-bold mb-6">

            Your AI Career Journey

          </h2>




          <div className="space-y-5">


            <JourneyItem
              text="Resume uploaded"
            />


            <JourneyItem
              text="AI resume analysis completed"
            />


            <JourneyItem
              text="ATS improvement suggestions generated"
            />


            <JourneyItem
              text="Skill gaps identified"
            />


          </div>


        </div>








        {/* Account Information */}

        <div className="bg-white rounded-xl shadow p-8">


          <h2 className="text-2xl font-bold mb-6">

            Account Information

          </h2>



          <div className="grid md:grid-cols-2 gap-5">



            <InfoCard
              title="Full Name"
              value={user.name}
            />



            <InfoCard
              title="Email"
              value={user.email}
            />



            <InfoCard
              title="Target Role"
              value="Software Engineer"
            />



            <InfoCard
              title="Account Status"
              value="Active"
            />


          </div>



        </div>






      </div>


    </div>


  );

}







function StatCard({title,value,description}) {


  return (

    <div className="bg-gray-50 p-5 rounded-xl">


      <p className="text-gray-500">

        {title}

      </p>



      <h3 className="text-3xl font-bold text-blue-600 mt-2">

        {value}

      </h3>



      <p className="text-sm text-gray-600">

        {description}

      </p>


    </div>

  );

}







function JourneyItem({text}) {


  return (

    <div className="flex items-center gap-3">


      <div className="w-3 h-3 rounded-full bg-green-500"></div>


      <p className="text-gray-700">

        {text}

      </p>


    </div>

  );

}







function InfoCard({title,value}) {


  return (

    <div className="bg-gray-50 p-5 rounded-lg">


      <p className="text-gray-500">

        {title}

      </p>



      <p className="font-semibold text-lg">

        {value}

      </p>


    </div>

  );

}





export default Profile;