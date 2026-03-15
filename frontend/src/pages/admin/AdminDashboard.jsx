import Sidebar from "../../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

function AdminDashboard() {

  // Fake data for demo
  const stressTrend = [
    { day: "Mon", stress: 40 },
    { day: "Tue", stress: 45 },
    { day: "Wed", stress: 60 },
    { day: "Thu", stress: 55 },
    { day: "Fri", stress: 70 }
  ];

  const riskDistribution = [
    { level: "Low", employees: 8 },
    { level: "Medium", employees: 5 },
    { level: "High", employees: 2 }
  ];

  return (

      <div style={{display:"flex"}}>

    <Sidebar />

    <div style={{flex:1, padding:"30px", fontFamily:"Arial", backgroundColor:"#c5c9dc"}}>
      <h1>Admin Monitoring Dashboard</h1>
      <p>Privacy-preserving employee wellness monitoring</p>
      <hr />
      {/* Risk Score Cards */}

      <div style={{
        display:"flex",
        gap:"20px",
        marginTop:"30px",
        marginBottom:"30px"
      }}>

        <div style={{
          padding:"20px",
          background:"#f5f5f5",
          borderRadius:"10px",
          width:"200px"
        }}>
          <h3>Avg Stress Score</h3>
          <h2>62%</h2>
        </div>

        <div style={{
          padding:"20px",
          background:"#f5f5f5",
          borderRadius:"10px",
          width:"200px"
        }}>
          <h3>High Risk Employees</h3>
          <h2>2</h2>
        </div>

        <div style={{
          padding:"20px",
          background:"#f5f5f5",
          borderRadius:"10px",
          width:"200px"
        }}>
          <h3>Alerts Today</h3>
          <h2>3</h2>
        </div>

      </div>
     <hr />
      {/* Stress Trend Chart */}

      <div style={{marginTop:"20px", marginBottom:"20px"}}>

        <h2>Stress Trend (Weekly)</h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={stressTrend}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

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
   <hr />
      {/* Risk Distribution */}

      <div style={{marginTop:"20px", marginBottom:"20px"}}>

        <h2>Employee Risk Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={riskDistribution}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="level" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="employees"
              fill="#1e88e5"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  </div>

  );

}

export default AdminDashboard;