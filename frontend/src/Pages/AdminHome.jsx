import React from "react";
import bg3 from "../assets/bg3.png";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const sections = [
        {
            title: "User Management",
            icon: "👥",
            items: [
                { title: "Add Faculty", path: "/addfaculty", icon: "➕" },
                { title: "View Faculty", path: "/viewfaculty", icon: "👨‍🏫" },
                { title: "Add HOD", path: "/addhod", icon: "🎖️" },
                { title: "View HOD", path: "/viewhod", icon: "👔" },
                { title: "Add Student", path: "/addstudent", icon: "🧑‍🎓+" },
                { title: "View Students", path: "/viewstudents", icon: "👨‍🎓" },
                { title: "View Advisors", path: "/viewadvisors", icon: "🎓" },
            ]
        },
        {
            title: "Library & Academics",
            icon: "📚",
            items: [
                { title: "Add Book", path: "/addbook", icon: "📖+" },
                { title: "View Books", path: "/viewbooks", icon: "📚" },
                { title: "Syllabus Map", path: "/syllabus-mapping", icon: "🗺️" },
                { title: "Borrowing", path: "/borrowing-history", icon: "📋" },
            ]
        }
    ];

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bg3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    position: "relative"
                }}
            >
                <div style={{ backgroundColor: "rgba(0,0,0,0.55)", minHeight: "100vh", padding: "60px 20px" }}>
                    <div className="container">
                        <div className="text-center mb-5 animate-fade-in">
                            <h1 style={{ fontWeight: "800", fontSize: "3rem", color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                                Admin <span style={{ color: "#d6ff65" }}>Control Center</span>
                            </h1>
                            <p className="text-light opacity-75 fs-5">Welcome back, {user?.name} | Institutional Management</p>
                        </div>

                        {sections.map((section, sIdx) => (
                            <div key={sIdx} className="mb-5 animate-slide-up" style={{ animationDelay: `${sIdx * 0.2}s` }}>
                                <h3 className="mb-4 d-flex align-items-center" style={{ color: "white", fontWeight: "700" }}>
                                    <span className="me-3" style={{ fontSize: "1.8rem" }}>{section.icon}</span>
                                    {section.title}
                                    <div className="ms-4 flex-grow-1" style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
                                </h3>

                                <div className="row g-4">
                                    {section.items.map((item, idx) => (
                                        <div className="col-xl-3 col-lg-4 col-md-6" key={idx}>
                                            <div
                                                className="admin-card-glass"
                                                onClick={() => navigate(item.path)}
                                                style={{
                                                    background: "rgba(255, 255, 255, 0.08)",
                                                    backdropFilter: "blur(12px)",
                                                    WebkitBackdropFilter: "blur(12px)",
                                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                                    borderRadius: "20px",
                                                    padding: "25px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    transition: "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                                    color: "white",
                                                    height: "100%"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "15px",
                                                        background: "rgba(255,255,255,0.1)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "1.5rem",
                                                        marginRight: "15px"
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>
                                                <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                    .admin-card-glass:hover {
                        transform: translateY(-8px) scale(1.02);
                        background: rgba(255, 255, 255, 0.15);
                        border-color: rgba(255, 255, 255, 0.4);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.3);
                    }
                    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
                    .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both; }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </>
    );
}

export default AdminHome;
