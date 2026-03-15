import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

function WellnessDashboard(){

  const navigate = useNavigate();

  const openChat = () => {
    navigate("/employee/chat");
  };

  const wellnessTips = [
    "Take a short 5-minute break",
    "Stretch your body to release tension",
    "Try a breathing exercise",
    "Talk with the AI assistant about your stress"
  ];

  return(

    <div style={{display:"flex", fontFamily:"Arial"}}>

      <Sidebar />

      <div style={{
        flex:1,
        padding:"30px",
        background:"#c5c9dc",
        minHeight:"100vh"
      }}>

        <h1>Employee Wellness Dashboard</h1>
        <p>Your personal mental wellness overview</p>

        {/* Wellness Cards */}

        <div style={{
          display:"flex",
          gap:"20px",
          marginTop:"30px"
        }}>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}>

            <h3 style={{color:"#444"}}>Stress Score</h3>
            <h2 style={{color:"#111"}}>52%</h2>

          </div>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}>

            <h3 style={{color:"#444"}}>Mood Trend</h3>
            <h2 style={{color:"#111"}}>Stable</h2>
          </div>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}>

              <h3 style={{color:"#444"}}>AI Sessions</h3>
            <h2 style={{color:"#111"}}>3 Today</h2>

          </div>

        </div>

        {/* Chat Assistant */}

        <div style={{marginTop:"40px"}}>

          <h2>Wellness AI Assistant</h2>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px"
          }}>

            <p style={{color:"#111"}}>
              Talk with the AI assistant about stress, burnout, or work pressure.
            </p>

            <button
              onClick={openChat}
              style={{
                marginTop:"10px",
                padding:"10px 18px",
                background:"#4CAF50",
                border:"none",
                borderRadius:"6px",
                color:"white",
                cursor:"pointer"
              }}
            >
              Open Wellness Chat
            </button>

          </div>

        </div>

        {/* Wellness Tips */}

        <div style={{marginTop:"40px"}}>

          <h2 >Wellness Tips</h2>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px"
          }}>

            {wellnessTips.map((tip,index)=>(
              <div key={index} style={{marginBottom:"10px", color:"#111"}}>
                🌿 {tip}
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default WellnessDashboard;