import { useState, useRef, useEffect } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";

function Chat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

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
          message: userMessage
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

  const sendSuggestion = (text) => {
    setMessage(text);
  };

  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[chat,isTyping]);

  return (

    <div style={{display:"flex"}}>

      <Sidebar />

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

          {/* AI typing */}

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