import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";

function ViewHod() {
    const navigate = useNavigate();
    const [hods, setHods] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((res) => res.json())
            .then((data) =>
                setHods(data.filter((u) => u.role === "hod" && u.department === "Computer Science"))
            );
    }, []);

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
                <div style={{ backgroundColor: 'rgba(0,0,0,0.65)', minHeight: '100vh', padding: '100px 20px 40px' }}>
                    <div className="container">
                        <div className="glass-panel text-center mb-5 p-5" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                            <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                                Executive Leadership
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>HOD <span style={{ color: "#d6ff65" }}>Registry</span></h1>
                            <p className="text-light opacity-75 mt-2">Computer Science & Engineering | Department Heads</p>
                        </div>

                        <div className="row g-4 justify-content-center">
                            {hods.length > 0 ? (
                                hods.map((h) => (
                                    <div key={h._id} className="col-lg-5 col-md-8">
                                        <div
                                            className="hod-card-glass p-5 text-center"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.05)",
                                                backdropFilter: "blur(25px)",
                                                border: "2px solid rgba(255, 255, 255, 0.1)",
                                                borderRadius: "40px",
                                                transition: "0.4s ease",
                                                color: "white",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <div className="mb-4 d-inline-block p-4" style={{ background: "rgba(214, 255, 101, 0.1)", borderRadius: "30px" }}>
                                                <h1 style={{ fontSize: "3rem", margin: 0 }}>🏛️</h1>
                                            </div>
                                            <h3 className="fw-bold mb-1">{h.name}</h3>
                                            <p className="text-uppercase fw-bold opacity-50 mb-4" style={{ letterSpacing: "2px", fontSize: "0.8rem", color: "#b8e63a" }}>Head of Department</p>

                                            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                                <div className="row g-2 justify-content-center">
                                                    <div className="col-auto px-3">
                                                        <span className="small opacity-50 d-block">Department</span>
                                                        <span className="small fw-bold">Computer Science</span>
                                                    </div>
                                                    <div className="col-auto border-start border-white border-opacity-10 px-3">
                                                        <span className="small opacity-50 d-block">System UID</span>
                                                        <span className="small fw-bold">{h.username}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative element */}
                                            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "radial-gradient(circle, rgba(214, 255, 101, 0.05) 0%, transparent 70%)", borderRadius: "50%" }}></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <h3 className="text-white opacity-25">No HOD records found.</h3>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-outline-light px-5 py-3"
                                style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)" }}
                                onClick={() => navigate(-1)}
                            >
                                ← Return to Workspace
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .hod-card-glass:hover {
                        transform: translateY(-10px);
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(214, 255, 101, 0.4);
                        box-shadow: 0 40px 80px rgba(0,0,0,0.5);
                    }
                `}</style>
            </div>
        </>
    );
}

export default ViewHod;
