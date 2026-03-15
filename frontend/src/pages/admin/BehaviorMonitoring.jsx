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

function BehaviorMonitoring() {

    const behaviorSignals = [
  "Late-night system activity increased by 18%",
  "Stress sentiment trend rising across employees",
  "Reduced engagement in AI wellness conversations",
  "Increased workload pressure indicators",
  "Burnout risk detected in 12% of employees"
];

  const alerts = [
    "High stress sentiment detected",
    "Unusual file download pattern",
    "Employee risk score increased"
  ];

  const stressTrend = [
    { time: "9AM", stress: 40 },
    { time: "10AM", stress: 55 },
    { time: "11AM", stress: 60 },
    { time: "12PM", stress: 50 },
    { time: "1PM", stress: 70 }
  ];

  return (

    <div style={{display:"flex", fontFamily:"Arial"}}>

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div style={{
        flex:1,
        padding:"30px",
        background:"#c5c9dc",
        minHeight:"100vh"
      }}>

        <h1>Behavior Monitoring</h1>

        {/* Risk Cards */}

        <div style={{
          display:"flex",
          gap:"20px",
          marginTop:"20px",
          marginBottom:"20px"
        }}>

        <div style={{
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  width:"200px",
  color:"#222"
}}>
  <h3 style={{color:"#444"}}>Risk Score</h3>
  <h2 style={{color:"#111"}}>68%</h2>
</div>
        
          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}>
            <h3 style={{color:"#444"}}>Stress Level</h3>
            <h2 style={{color:"#111"}}>High</h2>
          </div>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}>

            <h3 style={{color:"#444"}}>Alerts Today</h3>
            <h2 style={{color:"#111"}}>3</h2>
          </div>

        </div>
<hr />
        {/* Stress Chart */}

        <div style={{marginTop:"20px", marginBottom:"20px"}}>

          <h2>Stress Trend Monitoring</h2>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px"
          }}>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={stressTrend}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

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
<hr />
        {/* Behavioral Risk Signals (Anonymized) */}

<div style={{marginTop:"20px", marginBottom:"20px"}}>

  <h2>Anonymized Behavioral Risk Signals</h2>
  <p style={{color:"#666", marginTop:"10px"}}>
These insights are generated from anonymized behavioral analytics.
Individual employee identities and chat content remain private.
</p>

  <div style={{
    background:"white",
    padding:"20px",
    borderRadius:"10px"
  }}>

    {behaviorSignals.map((signal,index)=>(
      <div
        key={index}
        style={{
          borderBottom:"1px solid #eee",
          padding:"10px 0",
          color:"#231942"
        }}
      >
        {signal}
      </div>
    ))}

  </div>

</div>
<hr />

        {/* Alerts */}

        <div style={{marginTop:"20px", marginBottom:"20px"}}>

          <h2>Security Alerts</h2>

          <div style={{
            background:"#fff3cd",
            padding:"20px",
            borderRadius:"10px"
          }}>

            {alerts.map((alert,index)=>(
              <div key={index} style={{marginBottom:"10px", color:"#231942"}}>
                ⚠ {alert}
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default BehaviorMonitoring;