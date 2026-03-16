import React from "react";
import bg3 from "../assets/bg3.png";
import { useNavigate } from "react-router-dom";

function FacultyHome() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const commonItems = [
        { title: "View Books", path: "/viewbooks", icon: "📚", color: "#4facfe" },
        { title: "View Syllabus", path: "/view-syllabus", icon: "🗺️", color: "#667eea" },
        { title: "Borrowing History", path: "/borrowing-history", icon: "📋", color: "#764ba2" },
    ];

    const hodItems = [
        { title: "Add Faculty", path: "/addfaculty", icon: "👨‍🏫+", color: "#f093fb" },
        { title: "View Faculty", path: "/viewfaculty", icon: "👥", color: "#f5576c" },
        { title: "View Advisors", path: "/viewadvisors", icon: "🎓", color: "#48c6ef" },
        { title: "Add Student", path: "/addstudent", icon: "👶+", color: "#69f0ae" },
        { title: "Add Book", path: "/addbook", icon: "📖+", color: "#d6ff65" },
    ];

    const advisoryItems = [
        { title: "Syllabus Map", path: "/syllabus-mapping", icon: "🗺️", color: "#69f0ae" },
        { title: "View Students", path: "/viewstudents", icon: "👨‍🎓", color: "#d6ff65" },
    ];

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bg3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    width: "100%"
                }}
            >
                <div style={{ backgroundColor: "rgba(0,0,0,0.55)", minHeight: "100vh", padding: "100px 20px 40px" }}>
                    <div className="container">
                        <div className="text-center mb-5 animate-fade-in">
                            <h1 style={{ fontWeight: "800", fontSize: "3rem", color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                                {user?.role === "hod" ? "HOD" : "Faculty"} <span style={{ color: "#d6ff65" }}>Dashboard</span>
                            </h1>
                            <p className="text-light opacity-75 fs-5">Welcome, {user?.name} | CS Department Academic Panel</p>
                        </div>

                        {/* Common Section */}
                        <div className="row g-4 justify-content-center mb-5 animate-slide-up">
                            {commonItems.map((item, idx) => (
                                <div className="col-lg-3 col-md-6" key={idx}>
                                    <div 
                                        className="faculty-card-premium"
                                        onClick={() => navigate(item.path)}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(15px)",
                                            WebkitBackdropFilter: "blur(15px)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                            borderRadius: "24px",
                                            padding: "35px 20px",
                                            textAlign: "center",
                                            color: "white",
                                            cursor: "pointer",
                                            transition: "0.4s",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{ fontSize: "2.8rem", marginBottom: "15px" }}>{item.icon}</div>
                                        <h3 style={{ fontWeight: "700", fontSize: "1.2rem", margin: 0 }}>{item.title}</h3>
                                        <div style={{ width: "30px", height: "3px", background: item.color, marginTop: "12px", borderRadius: "10px" }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* HOD / Advisor Sections */}
                        {(user?.role === "hod" || user?.role === "advisor") && (
                            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                                <h4 className="mb-4" style={{ color: "white", fontWeight: "700", borderLeft: "4px solid #d6ff65", paddingLeft: "15px" }}>
                                    Administrative Control
                                </h4>
                                <div className="row g-4">
                                    {user?.role === "hod" && hodItems.map((item, idx) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={idx}>
                                            <div 
                                                className="faculty-card-premium mini"
                                                onClick={() => navigate(item.path)}
                                                style={{ borderLeft: `4px solid ${item.color}` }}
                                            >
                                                <span className="me-3 fs-3">{item.icon}</span>
                                                <span className="fw-bold">{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {advisoryItems.map((item, idx) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={idx}>
                                            <div 
                                                className="faculty-card-premium mini"
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
                        )}
                    </div>
                </div>

                <style>{`
                    .faculty-card-premium:hover {
                        transform: translateY(-10px);
                        background: rgba(255, 255, 255, 0.18);
                        border-color: rgba(255, 255, 255, 0.4);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                    }
                    .faculty-card-premium.mini {
                        background: rgba(255, 255, 255, 0.08);
                        backdropFilter: blur(10px);
                        border-radius: 15px;
                        padding: 20px;
                        display: flex;
                        align-items: center;
                        color: white;
                        cursor: pointer;
                        transition: 0.3s;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        height: 100%;
                    }
                    .faculty-card-premium.mini:hover {
                        background: rgba(255, 255, 255, 0.15);
                        transform: scale(1.03);
                    }
                    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
                    .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both; }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
            </div>
        </>
    );
}

export default FacultyHome;
