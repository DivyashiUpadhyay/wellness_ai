import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const generateAnonID = () => {
    return "emp_" + Math.random().toString(36).substring(2,10);
  };

  const goToEmployee = () => {

    let anonID = localStorage.getItem("anon_id");

    if(!anonID){
      anonID = generateAnonID();
      localStorage.setItem("anon_id", anonID);
    }

    localStorage.setItem("role","employee");

    navigate("/employee/chat");
  };

  const goToAdmin = () => {
    localStorage.setItem("role","admin");
    navigate("/admin/dashboard");
  };

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      background:"#0b0b0b",
      color:"white",
      fontFamily:"Arial"
    }}>

      <h1 style={{marginBottom:"40px"}}>
        Enterprise Wellness AI
      </h1>

      <p style={{marginBottom:"30px"}}>
        Privacy-Preserving Employee Wellness Monitoring
      </p>

      <div style={{display:"flex", gap:"20px"}}>

        <button
          onClick={goToEmployee}
          style={{
            padding:"15px 25px",
            fontSize:"16px",
            background:"#4CAF50",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Login as Employee
        </button>

        <button
          onClick={goToAdmin}
          style={{
            padding:"15px 25px",
            fontSize:"16px",
            background:"#1e88e5",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Login as Admin
        </button>

      </div>

      <p style={{marginTop:"40px", fontSize:"13px", opacity:0.7}}>
        🔒 Employees interact anonymously. AI detects wellness risk patterns without exposing identity.
      </p>

    </div>

  );
}

export default Login;