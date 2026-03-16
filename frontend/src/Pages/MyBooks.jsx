import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg3 from "../assets/bg3.png";

function MyBooks() {
    const navigate = useNavigate();
    const [myRecords, setMyRecords] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/borrowing?userId=${user._id}`);
                const data = await res.json();
                setMyRecords(data);
            } catch (err) {
                console.error("Error fetching my books:", err);
            }
        };
        fetchMyBooks();
    }, [user._id]);

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
                <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', minHeight: '100vh', padding: '100px 20px 40px' }}>
                    <div className="container">
                        <div className="glass-panel text-center mb-5 p-5" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                            <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.80rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                                Personal Library
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>My <span style={{ color: "#d6ff65" }}>Issued Books</span></h1>
                            <p className="text-light opacity-75 mt-2">Manage your active loans and upcoming deadlines</p>
                        </div>

                        <div className="row g-4">
                            {myRecords.length > 0 ? (
                                myRecords.map(r => (
                                    <div key={r._id} className="col-lg-6">
                                        <div
                                            className="loan-card-glass p-4"
                                            style={{
                                                background: r.status === 'overdue' ? "rgba(255, 77, 77, 0.08)" : "rgba(255, 255, 255, 0.06)",
                                                backdropFilter: "blur(20px)",
                                                border: r.status === 'overdue' ? "1px solid rgba(255, 77, 77, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                                                borderRadius: "28px",
                                                transition: "0.4s ease",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <span className={`status-tag ${r.status}`}>
                                                    {r.status.toUpperCase()}
                                                </span>
                                                <div className="text-end">
                                                    <span className="d-block small opacity-50 text-uppercase fw-bold">Settlement</span>
                                                    <span className={r.fine > 0 ? "text-danger fw-bold" : "text-success fw-bold"}>
                                                        {r.fine > 0 ? `₹${r.fine}` : "No Dues"}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="fw-bold text-white mb-1">{r.book?.title}</h3>
                                            <p className="opacity-50 mb-4">{r.book?.author}</p>

                                            <div className="row g-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                                <div className="col-6">
                                                    <div className="small opacity-50 text-uppercase fw-bold">Issue Date</div>
                                                    <div className="text-white fw-bold">{new Date(r.issueDate).toLocaleDateString()}</div>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <div className="small opacity-50 text-uppercase fw-bold">Return Threshold</div>
                                                    <div className={r.status === 'overdue' ? "text-danger fw-bold" : "text-white fw-bold"}>
                                                        {new Date(r.dueDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <div className="mb-4" style={{ fontSize: "4rem", opacity: 0.2 }}>📭</div>
                                    <h3 className="text-white opacity-25">No active book loans at the moment.</h3>
                                    <button
                                        className="btn btn-outline-light mt-4 px-4 py-2"
                                        style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)" }}
                                        onClick={() => navigate("/viewbooks")}
                                    >
                                        Browse Catalog
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-5 pt-4">
                            <button
                                className="btn btn-link text-light text-decoration-none opacity-50 hover-opacity-100"
                                onClick={() => navigate("/studenthome")}
                            >
                                ← Return to Student Workspace
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .loan-card-glass:hover {
                        transform: translateY(-8px);
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(214, 255, 101, 0.3);
                        box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                    }
                    .status-tag {
                        padding: 6px 14px;
                        border-radius: 12px;
                        font-size: 0.65rem;
                        font-weight: 900;
                        letter-spacing: 1.5px;
                        text-transform: uppercase;
                    }
                    .status-tag.returned { background: rgba(50, 255, 126, 0.12); color: #32ff7e; }
                    .status-tag.overdue { background: rgba(255, 77, 77, 0.12); color: #ff4d4d; }
                    .status-tag.borrowed { background: rgba(24, 202, 230, 0.12); color: #18cae6; }
                    .hover-opacity-100:hover { opacity: 1 !important; }
                `}</style>
            </div>
        </>
    );
}

export default MyBooks;
