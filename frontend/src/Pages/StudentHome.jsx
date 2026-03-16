import React from 'react'
import bg3 from '../assets/bg3.png'
import { useNavigate } from 'react-router-dom'

function StudentHome() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));

    const libraryItems = [
    { title: "Library Catalog", path: "/viewbooks", icon: "📚", color: "#4facfe" },
    { title: "My Holdings", path: "/mybooks", icon: "📖", color: "#00f2fe" },
    { title: "Loan Timeline", path: "/borrowing-history", icon: "⏳", color: "#764ba2" },
  ];

  const academicItems = [
    { title: "Semester Roadmap", path: "/semester", icon: "🛤️", color: "#d6ff65" },
    { title: "Subject Guides", path: "/view-syllabus", icon: "📋", color: "#667eea" },
  ];

  return (
    <>
      <div 
        style={{ 
            backgroundImage: `url(${bg3})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%'
        }}
    >
        <div style={{ backgroundColor: 'rgba(0,0,0,0.55)', minHeight: '100vh', padding: '100px 20px 40px' }}>
          <div className="container">
            <div className="text-center mb-5 animate-fade-in">
              <h1 style={{ fontWeight: "800", fontSize: "3rem", color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                Scholar <span style={{ color: "#d6ff65" }}>Portal</span>
              </h1>
              <p className="text-light opacity-75 fs-5">Welcome, {user?.name} | {user?.department || "Computer Science"} Student</p>
            </div>

            <div className="animate-slide-up">
              <h4 className="mb-4" style={{ color: "white", fontWeight: "700", borderLeft: "4px solid #4facfe", paddingLeft: "15px" }}>
                Library Services
              </h4>
              <div className="row g-4 mb-5">
                {libraryItems.map((item, idx) => (
                  <div className="col-lg-4 col-md-6" key={idx}>
                    <div 
                      className="scholar-card-mini"
                      onClick={() => navigate(item.path)}
                      style={{ borderLeft: `4px solid ${item.color}` }}
                    >
                      <span className="me-3 fs-3">{item.icon}</span>
                      <span className="fw-bold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="mb-4" style={{ color: "white", fontWeight: "700", borderLeft: "4px solid #d6ff65", paddingLeft: "15px" }}>
                Academic Resources
              </h4>
              <div className="row g-4">
                {academicItems.map((item, idx) => (
                  <div className="col-lg-4 col-md-6" key={idx}>
                    <div 
                      className="scholar-card-mini"
                      onClick={() => navigate(item.path)}
                      style={{ borderLeft: `4px solid ${item.color}` }}
                    >
                      <span className="me-3 fs-3">{item.icon}</span>
                      <span className="fw-bold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
            .scholar-card-mini {
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 25px;
                display: flex;
                align-items: center;
                color: white;
                cursor: pointer;
                transition: 0.3s;
                border: 1px solid rgba(255, 255, 255, 0.1);
                height: 100%;
            }
            .scholar-card-mini:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: scale(1.03);
                border-color: rgba(255, 255, 255, 0.3);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .animate-fade-in { animation: fadeIn 0.8s ease-out; }
            .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </>
  )
}

export default StudentHome
