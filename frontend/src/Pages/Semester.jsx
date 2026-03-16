import React from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";

const semesters = [
  { sem: "S1", title: "Semester 1", color: "#60a5fa" },
  { sem: "S2", title: "Semester 2", color: "#f472b6" },
  { sem: "S3", title: "Semester 3", color: "#a78bfa" },
  { sem: "S4", title: "Semester 4", color: "#34d399" },
  { sem: "S5", title: "Semester 5", color: "#fbbf24" },
  { sem: "S6", title: "Semester 6", color: "#22d3ee" },
  { sem: "S7", title: "Semester 7", color: "#f87171" },
  { sem: "S8", title: "Semester 8", color: "#d6ff65" },
];

function SemesterPage() {
  const navigate = useNavigate();
  return (
    <>
      <div 
        style={{ 
          backgroundImage: `url(${bg2})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', minHeight: '100vh', padding: '100px 20px 40px' }}>
          <div className="container">
            <div className="glass-panel text-center mb-5 p-5" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                Academic Roadmap
              </div>
              <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Choose <span style={{ color: "#d6ff65" }}>Semester</span></h1>
              <p className="text-light opacity-75 mt-2">Select your current academic level to view relevant resources</p>
            </div>

            <div className="row g-4">
              {semesters.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div 
                    className="sem-card-glass text-center p-5"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "32px",
                      cursor: "pointer",
                      transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    }}
                    onClick={() => navigate(`/viewbooks?sem=${item.sem}`)}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mx-auto mb-4"
                      style={{ 
                        width: "85px", 
                        height: "85px", 
                        background: "rgba(255, 255, 255, 0.05)", 
                        border: `2px solid ${item.color}`,
                        borderRadius: "24px", 
                        fontSize: "30px", 
                        fontWeight: "800", 
                        color: "white",
                        textShadow: `0 0 15px ${item.color}`
                      }}
                    >
                      {item.sem}
                    </div>
                    <h5 className="fw-bold text-white mb-0" style={{ letterSpacing: "0.5px" }}>{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <button
                className="btn btn-link text-light text-decoration-none opacity-50 hover-opacity-100"
                onClick={() => {
                  const role = JSON.parse(localStorage.getItem("user"))?.role;
                  if (role === "admin") navigate("/adminhome");
                  else if (role === "hod" || role === "faculty") navigate("/faculty");
                  else if (role === "advisor") navigate("/advisorhome");
                  else if (role === "student") navigate("/studenthome");
                  else navigate("/");
                }}
              >
                ← Return to Portal
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .sem-card-glass:hover {
            transform: translateY(-12px) scale(1.02);
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(214, 255, 101, 0.4);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          }
          .sem-card-glass:active {
            transform: scale(0.95);
          }
          .hover-opacity-100:hover { opacity: 1 !important; }
        `}</style>
      </div>
    </>
  );
}

export default SemesterPage;
