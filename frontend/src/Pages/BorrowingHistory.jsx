import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";
import { toast } from "react-toastify";

function BorrowingHistory() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        let query = "";
        if (user.role === "student") query = `?userId=${user._id}`;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/borrowing${query}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setRecords(data);
            } else {
                setRecords([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setRecords([]);
        }
    };

    const handleReturn = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/borrowing/return/${id}`, {
            method: "PUT"
        });
        if (res.ok) {
            toast.success("Book returned successfully");
            fetchRecords();
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
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
                            <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                                Transaction Log
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Borrowing <span style={{ color: "#d6ff65" }}>History</span></h1>
                            <p className="text-light opacity-75 mt-2">Track library circulations and academic resource status</p>
                        </div>

                        <div className="glass-panel" style={{ borderRadius: "28px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
                            <div className="table-responsive">
                                <table className="table-premium w-100">
                                    <thead>
                                        <tr>
                                            <th>Book Details</th>
                                            {user.role !== "student" && <th>Member</th>}
                                            <th>Timeline</th>
                                            <th>Status</th>
                                            <th>Settlement</th>
                                            <th className="text-end">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map(r => (
                                            <tr key={r._id} style={{ background: r.status === 'overdue' ? 'rgba(255, 77, 77, 0.05)' : 'transparent' }}>
                                                <td>
                                                    <div className="fw-bold text-white">{r.book.title}</div>
                                                    <div className="small opacity-50">{r.book.author}</div>
                                                </td>
                                                {user.role !== "student" && (
                                                    <td>
                                                        <div className="text-white">{r.user.name}</div>
                                                        <div className="small opacity-50">{r.user.registerNo}</div>
                                                    </td>
                                                )}
                                                <td>
                                                    <div className="small text-white">Issue: {new Date(r.issueDate).toLocaleDateString()}</div>
                                                    <div className="small text-warning">Due: {new Date(r.dueDate).toLocaleDateString()}</div>
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${r.status}`}>
                                                        {r.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={r.fine > 0 ? "text-danger fw-bold" : "text-success"}>
                                                        {r.fine > 0 ? `₹${r.fine}` : "Cleared"}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    {r.status !== 'returned' && user.role !== 'student' && (
                                                        <button
                                                            className="btn-return"
                                                            onClick={() => handleReturn(r._id)}
                                                        >
                                                            Accept Return
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {records.length === 0 && (
                                    <div className="text-center py-5 text-light opacity-50">No circulation records found.</div>
                                )}
                            </div>
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
                                ← Back to Portal Home
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.06);
                        backdrop-filter: blur(25px);
                        -webkit-backdrop-filter: blur(25px);
                    }
                    .table-premium th {
                        background: rgba(255, 255, 255, 0.05);
                        padding: 20px 25px;
                        color: #d6ff65;
                        font-size: 0.75rem;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        border: none;
                    }
                    .table-premium td {
                        padding: 22px 25px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                        vertical-align: middle;
                        transition: 0.3s;
                    }
                    .table-premium tr:hover td {
                        background: rgba(255, 255, 255, 0.03);
                    }
                    .status-pill {
                        padding: 5px 12px;
                        border-radius: 8px;
                        font-size: 0.7rem;
                        font-weight: 800;
                        letter-spacing: 1px;
                    }
                    .status-pill.returned { background: rgba(50, 255, 126, 0.15); color: #32ff7e; }
                    .status-pill.overdue { background: rgba(255, 77, 77, 0.15); color: #ff4d4d; }
                    .status-pill.borrowed { background: rgba(24, 202, 230, 0.15); color: #18cae6; }
                    
                    .btn-return {
                        background: #d6ff65;
                        color: #1a2a3a;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 10px;
                        font-weight: 700;
                        font-size: 0.85rem;
                        transition: 0.3s;
                    }
                    .btn-return:hover {
                        transform: scale(1.05);
                        box-shadow: 0 5px 15px rgba(214, 255, 101, 0.3);
                    }
                    .hover-opacity-100:hover { opacity: 1 !important; }
                `}</style>
            </div>
        </>
    );
}

export default BorrowingHistory;
