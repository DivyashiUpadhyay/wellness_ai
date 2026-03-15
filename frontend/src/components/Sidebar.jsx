import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar(){

  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#4CAF50" : "white",
    textDecoration:"none",
    fontWeight: location.pathname === path ? "bold" : "normal"
  });

  return(

    <div style={{
      width:"220px",
      background:"#111",
      color:"white",
      height:"100vh",
      padding:"20px",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between"
    }}>

      <div>

        <h2>{role === "admin" ? "Security Panel" : "Employee Portal"}</h2>

        <div style={{
          marginTop:"30px",
          display:"flex",
          flexDirection:"column",
          gap:"15px"
        }}>

          {/* ADMIN LINKS */}

          {role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                style={linkStyle("/admin/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/behavior"
                style={linkStyle("/admin/behavior")}
              >
                Behavior Monitoring
              </Link>
            </>
          )}

          {/* EMPLOYEE LINKS */}

          {role === "employee" && (
            <>
              <Link
                to="/employee/wellness"
                style={linkStyle("/employee/wellness")}
              >
                Wellness Dashboard
              </Link>

              <Link
                to="/employee/stress"
                style={linkStyle("/employee/stress")}
              >
                Stress Insights
              </Link>

              <Link
                to="/employee/chat"
                style={linkStyle("/employee/chat")}
              >
                AI Chat
              </Link>
            </>
          )}

        </div>

      </div>

      <button
        onClick={logout}
        style={{
          marginTop:"30px",
          padding:"10px",
          background:"#e53935",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;