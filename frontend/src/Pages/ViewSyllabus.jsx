import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";
import { toast } from "react-toastify";

function ViewSyllabus() {
    const navigate = useNavigate();
    const [syllabuses, setSyllabuses] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const [filterSem, setFilterSem] = useState(user?.semester || "");

    useEffect(() => {
        fetchSyllabuses();
    }, [filterSem]);

    const fetchSyllabuses = async () => {
        let queryParams = new URLSearchParams();
        if (user?.department) queryParams.append("department", user.department);
        if (filterSem) queryParams.append("semester", filterSem);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/syllabus?${queryParams.toString()}`);
        const data = await res.json();
        setSyllabuses(data);
    };

    const handleBorrow = async (bookId) => {
        try {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14); // 2 weeks

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/borrowing/issue`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    bookId: bookId,
                    dueDate: dueDate.toISOString()
                })
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Request submitted successfully!");
            } else {
                toast.error(data.message || "Failed to issue book");
            }
        } catch (err) {
            toast.error("Error submitting request");
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
                <div style={{ backgroundColor: 'rgba(0,0,0,0.65)', minHeight: '100vh', padding: '100px 20px 40px' }}>
                    <div className="container">
                        <div className="glass-panel text-center mb-5 p-5" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                            <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                                Academic Catalog
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Syllabus <span style={{ color: "#d6ff65" }}>Explorer</span></h1>
                            <p className="text-light opacity-75 mt-2">Comprehensive subject guides and recommended references</p>

                            {user?.role !== "student" && (
                                <div className="mt-4 mx-auto" style={{ maxWidth: "300px" }}>
                                    <select
                                        className="form-select-premium w-100"
                                        value={filterSem}
                                        onChange={e => setFilterSem(e.target.value)}
                                    >
                                        <option value="">All Semesters</option>
                                        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="row g-4">
                            {syllabuses.map(s => (
                                <div className={expandedId === s._id ? "col-12" : "col-lg-4 col-md-6"} key={s._id} style={{ transition: '0.5s ease' }}>
                                    <div
                                        className={`syllabus-card-glass h-100 p-4 ${expandedId === s._id ? 'expanded' : ''}`}
                                        onClick={() => setExpandedId(expandedId === s._id ? null : s._id)}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.05)",
                                            backdropFilter: "blur(20px)",
                                            border: expandedId === s._id ? "1px solid #d6ff65" : "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "28px",
                                            transition: "0.3s ease",
                                            color: "white",
                                            cursor: "pointer",
                                            position: "relative",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge" style={{ background: "rgba(214, 255, 101, 0.2)", color: "#d6ff65", borderRadius: "10px", padding: "6px 14px", fontWeight: "800", fontSize: "0.7rem" }}>
                                                {s.semester}
                                            </span>
                                            <div className="text-end">
                                                <span className="opacity-50 small fw-bold d-block">{s.subjectCode}</span>
                                                <span className="text-xs opacity-25 fw-bold" style={{ fontSize: '0.6rem' }}>{expandedId === s._id ? 'Click to collapse' : 'Click to expand'}</span>
                                            </div>
                                        </div>
                                        <h4 className="fw-bold mb-3">{s.subjectName}</h4>
                                        <p
                                            className="opacity-75 small mb-4"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: expandedId === s._id ? 'unset' : '3',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: expandedId === s._id ? 'visible' : 'hidden',
                                                transition: '0.3s'
                                            }}
                                        >
                                            {s.syllabusContent || "Subject syllabus details pending submission."}
                                        </p>

                                        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                            <h6 className="small text-uppercase fw-extrabold mb-3" style={{ color: "#d6ff65", letterSpacing: "1px" }}>Recommended Resources</h6>
                                            <div className="mapped-books-list" onClick={e => e.stopPropagation()}>
                                                {s.mappedBooks.length > 0 ? (
                                                    s.mappedBooks.map(b => (
                                                        <div key={b._id} className="d-flex align-items-center justify-content-between mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <div style={{ width: "6px", height: "6px", background: "#d6ff65", borderRadius: "50%", marginRight: "10px" }}></div>
                                                                <span className="small opacity-90">{b.title}</span>
                                                            </div>
                                                            {user?.role === "student" && (
                                                                <button
                                                                    className="btn btn-sm btn-outline-light py-0 px-2"
                                                                    style={{ fontSize: '0.65rem', borderRadius: '6px', height: '20px' }}
                                                                    onClick={() => handleBorrow(b._id)}
                                                                >
                                                                    Request
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="opacity-25 small italic">No books linked yet</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-outline-light px-5 py-3"
                                style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)" }}
                                onClick={() => navigate(-1)}
                            >
                                Back to Workspace
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .syllabus-card-glass:hover {
                        transform: translateY(-8px);
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(214, 255, 101, 0.4);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    }
                    .form-select-premium {
                        background: rgba(255, 255, 255, 0.08) !important;
                        border: 1px solid rgba(255, 255, 255, 0.15) !important;
                        border-radius: 14px !important;
                        padding: 12px 18px !important;
                        color: white !important;
                    }
                    .form-select-premium option { background: #1a2a3a; }
                `}</style>
            </div>
        </>
    );
}

export default ViewSyllabus;
