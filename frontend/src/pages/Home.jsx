import { useNavigate } from "react-router-dom";
import "../App.css";

import logo from "../assets/log.jpg";
import ha from "../assets/ha.jpg";
import di from "../assets/di.jpg";
import har from "../assets/har.jpg";
import sa from "../assets/sa.jpg";
import him from "../assets/him.jpg";
import bg from "../assets/bg.png";

const Home = () => {

  const navigate = useNavigate();

  const team = [
    {
      name: "Himanshu",
      role: "Backend Lead & System Architect",
      desc: "Specializes in building robust Node.js servers and integrating complex API workflows for seamless system communication.",
      img: him,
    },
    {
      name: "Harshit",
      role: "AI Module Developer & Frontend Logic",
      desc: "Expert in RAG implementation, vector databases, and connecting Groq AI with Hugging Face embeddings.",
      img: har,
    },
    {
      name: "Divyashi",
      role: "UI/UX Designer & Chatflow Specialist",
      desc: "Focuses on creating intuitive user interfaces and designing the conversational logic for the Shanti AI persona.",
      img: di,
    },
    {
      name: "Harshvardhan",
      role: "Activity Monitoring & Data Simulation",
      desc: "Responsible for developing the real-time activity tracking modules and simulating employee behavior logs.",
      img: ha,
    },
    {
      name: "Sakshi",
      role: "Risk Engine Specialist & Dashboard Dev",
      desc: "Architect of the cybersecurity risk engine that calculates threat levels based on mental wellness and activity data.",
      img: sa,
    },
  ];

return (
    <div
        className="home-page"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh"
        }}
    >

        {/* NAVBAR */}
        <div className="navbar">

            <div className="nav-logo">
                Shanti AI
            </div>

            <button
                className="nav-login green-btn custom-green-btn"
                onClick={() => navigate("/login")}
            >   
                Login
            </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="main-container">

            <header className="header-section">

                <h1 className="main-heading" style={{ color: "white" }}>Shanti AI</h1>
                <br />
                <p className="hero-subtext">
                    AI-powered enterprise platform for monitoring employee wellness
                    while detecting potential insider threats.
                </p>

                <h3 className="main-heading1">We are TEAM :</h3>

                <div className="hero-logo-container">
                    <img src={logo} alt="Orageeks Logo" className="hero-logo" />
                </div>

                <h3 className="main-heading1">Meet Our Team Members</h3>

            </header>

            {/* Team Circles */}
            <div className="team-visuals">

                <div className="team-row">
                    {team.slice(0, 3).map((m, i) => (
                        <div key={i} className="member-circle">
                            <img src={m.img} alt={m.name} />
                            <div className="member-name">{m.name}</div>
                        </div>
                    ))}
                </div>

                <div className="team-row">
                    {team.slice(3, 5).map((m, i) => (
                        <div key={i} className="member-circle">
                            <img src={m.img} alt={m.name} />
                            <div className="member-name">{m.name}</div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Team Description */}
            <div className="info-section">
                {team.map((m, i) => (
                    <div key={i} className="member-card">
                        <div className="card-header">
                            <h3>{m.name}</h3>
                            <span className="member-role">{m.role}</span>
                        </div>
                        <p className="member-desc">{m.desc}</p>
                    </div>
                ))}
            </div>

            {/* Workflow */}
            <section className="problem-section">

                <h2 className="problem-heading">
                    Problem Statement : ENTERPRISE MENTAL WELLNESS AI WITH INSIDER THREAT MONITORING
                </h2>

                <div className="workflow">

                    <div className="workflow-box">Employee Chat App</div>
                    <div className="arrow">↓</div>

                    <div className="workflow-box">All data is saved in database</div>
                    <div className="arrow">↓</div>

                    <div className="workflow-box">AI Sentiment Analysis</div>
                    <div className="arrow">↓</div>

                    <div className="workflow-box">Risk Scoring Engine</div>
                    <div className="arrow">↓</div>

                    <div className="workflow-box">HR Dashboard</div>

                </div>

            </section>

            {/* Login CTA */}
            <button
                className="about-btn green-btn custom-green-btn"
                style={{ marginTop: "20px" }}
                onClick={() => navigate("/login")}
            >
                Login to Dashboard
            </button>

            <footer>
                <h3 className="footer-text">
                    Website created by Team Orageeks from GIT Jaipur
                </h3>
            </footer>

        </div>
        {/* Custom styles for green button */}
        <style>{`
            .custom-green-btn {
                background-color: #28a745 !important;
                color: #fff !important;
                border: none;
                box-shadow: none;
                transition: box-shadow 0.2s, background 0.2s;
            }
            .custom-green-btn:hover, .custom-green-btn:focus {
                background-color: #218838 !important;
                box-shadow: 0 4px 16px rgba(40,167,69,0.3), 0 1.5px 4px rgba(0,0,0,0.08);
                color: #fff !important;
            }
        `}</style>
    </div>
);
};

export default Home;