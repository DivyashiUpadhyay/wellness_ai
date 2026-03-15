import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function SessionSidebar({ loadSession }) {

  const [sessions, setSessions] = useState([]);

  useEffect(()=>{

    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(stored);

  },[]);

 const createNewChat = () => {

  const id = "session-" + Date.now();

  const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

  sessions.push(id);

  localStorage.setItem("sessions", JSON.stringify(sessions));
  localStorage.setItem("current_session", id);

  loadSession(id); // directly switch session

};

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("anon_id");
  navigate("/");
};

  return(

    <div style={{
      width:"220px",
      background:"#1e1e1e",
      color:"white",
      padding:"15px",
      overflowY:"auto"
    }}>

      <button
        onClick={createNewChat}
        style={{
          width:"100%",
          padding:"10px",
          marginBottom:"15px",
          background:"#4CAF50",
          border:"none",
          borderRadius:"6px",
          color:"white",
          cursor:"pointer"
        }}
      >
        + New Chat
      </button>

      {sessions.map((id)=>(
        <div
          key={id}
          onClick={()=>loadSession(id)}
          style={{
            padding:"8px",
            borderBottom:"1px solid #444",
            cursor:"pointer"
          }}
        >
          {id}
        </div>
      ))}

<button
  onClick={logout}
  style={{
    marginTop:"20px",
    padding:"10px",
    background:"#e53935",
    border:"none",
    borderRadius:"6px",
    color:"white",
    cursor:"pointer",
    width:"100%"
  }}
>
Logout
</button>
    </div>

  );

}

export default SessionSidebar;