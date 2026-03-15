import Sidebar from "../../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StressInsights(){

  const stressData = [
    { day:"Mon", stress:35 },
    { day:"Tue", stress:40 },
    { day:"Wed", stress:55 },
    { day:"Thu", stress:50 },
    { day:"Fri", stress:45 }
  ];

  const signals = [
    "Mild work pressure detected",
    "Stress level slightly elevated mid-week",
    "Positive recovery trend on Friday"
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

        <h1>Stress Insights</h1>
        <p>Your personal stress analytics from AI interactions</p>

        {/* Stress Chart */}

        <div style={{marginTop:"40px"}}>

          <h2>Weekly Stress Trend</h2>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px"
          }}>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={stressData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day"/>

                <YAxis/>

                <Tooltip/>

                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="#4CAF50"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI Signals */}

        <div style={{marginTop:"40px"}}>

          <h2>AI Wellness Signals</h2>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px"
          }}>

            {signals.map((signal,index)=>(
              <div key={index} style={{marginBottom:"10px"}}>
                📊 {signal}
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default StressInsights;