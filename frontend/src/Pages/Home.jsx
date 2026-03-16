import React from 'react'
import bg1 from '../assets/bg1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faUserTie, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const loginTypes = [
        { title: "Admin Portal", path: "/adminlogin", icon: faUserShield, color: "#d6ff65", desc: "Manage institution, faculty and library systems." },
        { title: "Faculty Portal", path: "/faculty", icon: faUserTie, color: "#4facfe", desc: "Manage students, syllabus and recommendations." },
        { title: "Student Portal", path: "/studentlogin", icon: faUserGraduate, color: "#f093fb", desc: "Access books, syllabus and borrowing records." },
    ];

    return (
        <div 
            style={{ 
                backgroundImage: `url(${bg1})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                height: '100vh', 
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div 
                style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.65)', 
                    height: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                {/* Branding Section */}
                <div className="text-center mb-5 animate-slide-up">
                    <h5 style={{ color: "#d6ff65", letterSpacing: "4px", fontWeight: "600", textTransform: "uppercase", marginBottom: "15px" }}>
                        Digital Excellence
                    </h5>
                    <h1 style={{ fontWeight: "800", fontSize: "3.5rem", color: "white", textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
                        CS DEPARTMENT <span style={{ color: "white", opacity: 0.7 }}>LIBRARY</span>
                    </h1>
                    <div style={{ width: "100px", height: "4px", background: "#d6ff65", margin: "20px auto", borderRadius: "10px" }}></div>
                </div>

                {/* Login Selection */}
                <div className="container" style={{ maxWidth: "1000px" }}>
                    <div className="row g-4 justify-content-center">
                        {loginTypes.map((type, idx) => (
                            <div className="col-lg-4 col-md-6" key={idx}>
                                <div 
                                    className="login-card-premium"
                                    onClick={() => navigate(type.path)}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.08)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid rgba(255, 255, 255, 0.15)",
                                        borderRadius: "30px",
                                        padding: "40px 30px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "all 0.4s ease",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                >
                                    <div 
                                        style={{ 
                                            fontSize: "3rem", 
                                            color: type.color, 
                                            marginBottom: "20px",
                                            filter: `drop-shadow(0 0 10px ${type.color}44)`
                                        }}
                                    >
                                        <FontAwesomeIcon icon={type.icon} />
                                    </div>
                                    <h3 style={{ color: "white", fontWeight: "700", marginBottom: "12px" }}>{type.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", margin: 0 }}>{type.desc}</p>
                                    
                                    <div className="hover-glow" style={{
                                        position: "absolute",
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: `radial-gradient(circle at center, ${type.color}22 0%, transparent 70%)`,
                                        opacity: 0,
                                        transition: "0.4s"
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-5 text-center text-light opacity-50" style={{ fontSize: "0.9rem" }}>
                    © 2026 Computer Science Department. All rights reserved.
                </div>
            </div>

            <style>{`
                .login-card-premium:hover {
                    transform: translateY(-15px);
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(255, 255, 255, 0.3);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                .login-card-premium:hover .hover-glow {
                    opacity: 1;
                }
                .animate-slide-up {
                    animation: slideUp 1s cubic-bezier(0.23, 1, 0.32, 1);
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
        </div>
    )
}

export default Home
