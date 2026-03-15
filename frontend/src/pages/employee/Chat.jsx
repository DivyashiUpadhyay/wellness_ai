import { useState, useRef, useEffect } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import SessionSidebar from "../../components/SessionSidebar";

function Chat() {

  const [message, setMessage] = useState("");
const [sessionId, setSessionId] = useState(() => {
  let id = localStorage.getItem("current_session");

  if (!id) {
    id = "session-" + Date.now();
    localStorage.setItem("current_session", id);

    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.push(id);
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }

  return id;
});

const [chat, setChat] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem(sessionId);
  setChat(saved ? JSON.parse(saved) : []);
}, [sessionId]);

  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);


 const loadSession = (id) => {

  localStorage.setItem("current_session", id);

  setSessionId(id);

};
  // Get anonymous employee ID
  const anonID = localStorage.getItem("anon_id");

  /* ===============================
     LOAD PREVIOUS CHAT HISTORY
  =============================== */

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const response = await fetch(`http://localhost:5000/api/history/${anonID}`);
        const data = await response.json();

        if(data.history){
          setChat(data.history);
        }

      } catch(error){
        console.error("History fetch error:", error);
      }

    };

    if(anonID){
      fetchHistory();
    }

  }, [anonID]);

  useEffect(() => {
  if(sessionId){
    localStorage.setItem(sessionId, JSON.stringify(chat));
  }
}, [chat, sessionId]);

  /* ===============================
     SEND MESSAGE
  =============================== */

  const sendMessage = async () => {

    if(message.trim() === "") return;

    const userMessage = message;

    // show user message immediately
    setChat(prev => [
      ...prev,
      { sender:"User", text:userMessage }
    ]);

    setMessage("");
    setIsTyping(true);

    try {

      const response = await fetch("http://localhost:5000/api/chat", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          message: userMessage,
          anon_id: anonID,
          timestamp: Date.now()
        })
      });

      const data = await response.json();

      setIsTyping(false);

      setChat(prev => [
        ...prev,
        { sender:"AI", text: data.reply }
      ]);

    } catch(error){

      console.error("Chat error:", error);

      setIsTyping(false);

      setChat(prev => [
        ...prev,
        { sender:"AI", text:"Sorry, something went wrong. Please try again." }
      ]);

    }

  };


  /* ===============================
     SUGGESTION BUTTONS
  =============================== */

  const sendSuggestion = (text) => {
    setMessage(text);
  };


  /* ===============================
     AUTO SCROLL CHAT
  =============================== */

  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[chat,isTyping]);


  return (

    <div style={{display:"flex"}}>

<SessionSidebar loadSession={loadSession} />

      <div style={{
        flex:1,
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        background:"#c5c9dc",
        color:"white",
        fontFamily:"Arial"
      }}>

        {/* HEADER */}

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"15px 25px",
          borderBottom:"1px solid #ffffff"
        }}>

          <h2 style={{ color: "black" }}>Wellness AI Assistant</h2>

<button
  onClick={()=>{
    const newSession = "session-" + Date.now();

    localStorage.setItem("current_session", newSession);

    setChat([]);

    window.location.reload();
  }}
  style={{
    padding:"6px 12px",
    background:"#1976d2",
    border:"none",
    borderRadius:"6px",
    color:"white",
    cursor:"pointer"
  }}
>
New Chat
</button>


  <button
  onClick={()=>{
    localStorage.removeItem("chat_history");
    setChat([]);
  }}
  style={{
    padding:"6px 12px",
    background:"#e53935",
    border:"none",
    borderRadius:"6px",
    color:"white",
    cursor:"pointer"
  }}
>
Clear Session
</button>
<div style={{fontSize:"12px", color:"#444"}}>
Session ID: {sessionId}
</div>
        </div>

        {/* CHAT AREA */}

        <div style={{
          flex:1,
          overflowY:"auto",
          padding:"30px"
        }}>

          {chat.map((msg,index)=>{

            const isUser = msg.sender === "User";

            return(

              <div
                key={index}
                style={{
                  display:"flex",
                  justifyContent: isUser ? "flex-end":"flex-start",
                  marginBottom:"15px"
                }}
              >

                <div style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"10px",
                  maxWidth:"70%"
                }}>

                  {!isUser && <FaRobot size={22} color="#4CAF50"/>}

                  <div style={{
                    background: isUser ? "#4CAF50":"#1e1e1e",
                    padding:"12px 16px",
                    borderRadius:"12px",
                    lineHeight:"1.4"
                  }}>
                    {msg.text}
                  </div>

                  {isUser && <FaUser size={22}/>}

                </div>

              </div>

            );

          })}

          {/* AI typing indicator */}

          {isTyping && (

            <div style={{display:"flex",gap:"10px"}}>

              <FaRobot size={22} color="#4CAF50"/>

              <div style={{
                background:"#1e1e1e",
                padding:"12px 16px",
                borderRadius:"12px"
              }}>
                AI is typing...
              </div>

            </div>

          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* SUGGESTION CHIPS */}

        <div style={{
          display:"flex",
          gap:"10px",
          padding:"10px 20px",
          flexWrap:"wrap"
        }}>

          {["Feeling stressed","Work pressure","Burnout","Need motivation"].map((item, idx)=>(
            
            <button
              key={item + idx}
              onClick={()=>sendSuggestion(item)}
              style={{
                background:"#1e1e1e",
                color:"white",
                border:"1px solid #333",
                padding:"6px 12px",
                borderRadius:"20px",
                cursor:"pointer"
              }}
            >
              {item}
            </button>

          ))}

        </div>

        {/* INPUT */}

        <div style={{
          display:"flex",
          padding:"15px",
          borderTop:"1px solid #333"
        }}>

          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={(e)=>{if(e.key==="Enter")sendMessage();}}
            style={{
              flex:1,
              padding:"12px",
              borderRadius:"8px",
              border:"none",
              outline:"none"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginLeft:"10px",
              padding:"12px 18px",
              background:"#4CAF50",
              border:"none",
              borderRadius:"8px",
              cursor:"pointer"
            }}
          >
            <FiSend color="white"/>
          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;