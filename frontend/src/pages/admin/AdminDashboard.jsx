import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
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

  const [avgStress, setAvgStress] = useState(0);
  const [riskData, setRiskData] = useState([]);
  const [stressTrend, setStressTrend] = useState([]);

  const [highRiskEmployees, setHighRiskEmployees] = useState(0);
  const [alertsToday, setAlertsToday] = useState(0);

  useEffect(() => {

    const fetchAnalytics = async () => {

      const res = await fetch("http://localhost:5000/api/admin/analytics");
      const data = await res.json();

      setAvgStress(data.avgStress);

      setRiskData([
        { level: "Low", employees: data.riskDistribution.low },
        { level: "Medium", employees: data.riskDistribution.medium },
        { level: "High", employees: data.riskDistribution.high }
      ]);

      setHighRiskEmployees(data.riskDistribution.high);

      setAlertsToday(Math.floor(data.riskDistribution.high / 2));

      setStressTrend([
        { day: "Mon", stress: data.avgStress - 5 },
        { day: "Tue", stress: data.avgStress - 2 },
        { day: "Wed", stress: data.avgStress + 3 },
        { day: "Thu", stress: data.avgStress },
        { day: "Fri", stress: data.avgStress + 5 }
      ]);

    };

    fetchAnalytics();

  }, []);

  return (

    <div style={{display:"flex"}}>

      <Sidebar />

      <div style={{
        flex:1,
        padding:"30px",
        fontFamily:"Arial",
        backgroundColor:"#c5c9dc"
      }}>

        <h1>Admin Monitoring Dashboard</h1>
        <p>Privacy-preserving employee wellness monitoring</p>
        <hr />

        {/* Cards */}

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
            <h2>{avgStress}%</h2>
          </div>

          <div style={{
            padding:"20px",
            background:"#f5f5f5",
            borderRadius:"10px",
            width:"200px"
          }}>
            <h3>High Risk Employees</h3>
            <h2>{highRiskEmployees}</h2>
          </div>

          <div style={{
            padding:"20px",
            background:"#f5f5f5",
            borderRadius:"10px",
            width:"200px"
          }}>
            <h3>Alerts Today</h3>
            <h2>{alertsToday}</h2>
          </div>

        </div>

        <hr />

        {/* Stress Trend */}

        <div style={{marginTop:"20px", marginBottom:"20px"}}>

          <h2>Stress Trend (Weekly)</h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={stressTrend}>

              <CartesianGrid strokeDasharray="3 3"/>
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

        <hr />

        {/* Risk Distribution */}

        <div style={{marginTop:"20px", marginBottom:"20px"}}>

          <h2>Employee Risk Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={riskData}>

              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="level"/>
              <YAxis/>
              <Tooltip/>

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