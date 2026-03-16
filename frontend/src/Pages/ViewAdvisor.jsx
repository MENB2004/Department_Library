import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";
import { toast } from "react-toastify";

function ViewAdvisors() {
    const navigate = useNavigate();
    const [advisors, setAdvisors] = useState([]);
    const [editingAdvisor, setEditingAdvisor] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchAdvisors();
    }, []);

    const fetchAdvisors = () => {
        fetch("https://department-library-api.onrender.com/api/users/advisors")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAdvisors(data.filter(u => u.department === "Computer Science"));
                } else {
                    setAdvisors([]);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setAdvisors([]);
            });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this advisor?")) return;
        try {
            const res = await fetch(`https://department-library-api.onrender.com/api/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Advisor removed");
                fetchAdvisors();
            }
        } catch (err) {
            toast.error("Error removing advisor");
        }
    };

    const handleEdit = (a) => {
        setEditingAdvisor({ ...a });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://department-library-api.onrender.com/api/users/${editingAdvisor._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingAdvisor),
            });
            if (res.ok) {
                toast.success("Advisor updated");
                setEditingAdvisor(null);
                fetchAdvisors();
            }
        } catch (err) {
            toast.error("Error updating advisor");
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
                                Department Guidance
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Class <span style={{ color: "#d6ff65" }}>Advisors</span></h1>
                            <p className="text-light opacity-75 mt-2">Dedicated mentorship for Computer Science batches</p>
                        </div>

                        <div className="row g-4">
                            {advisors.length > 0 ? (
                                advisors.map(a => (
                                    <div key={a._id} className="col-lg-4 col-md-6">
                                        <div
                                            className="advisor-card-glass h-100 p-4"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.05)",
                                                backdropFilter: "blur(20px)",
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                borderRadius: "28px",
                                                transition: "0.3s ease",
                                                color: "white"
                                            }}
                                        >
                                            <div className="d-flex align-items-center mb-4">
                                                <div style={{ width: "50px", height: "50px", background: "rgba(214, 255, 101, 0.2)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px", fontSize: "1.2rem" }}>
                                                    🎓
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-0">{a.name || a.username}</h5>
                                                    <span className="small opacity-50 text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>Advisor</span>
                                                </div>
                                            </div>

                                            <div className="p-3" style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <div className="mb-3">
                                                    <span className="small opacity-50 d-block">Mentorship Class</span>
                                                    <span className="small fw-bold text-white">{a.advisoryClass || "General CS"}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span className="small opacity-50 d-block">Batch</span>
                                                        <span className="small fw-bold">{a.batch || "N/A"}</span>
                                                    </div>
                                                    <div className="text-end">
                                                        <span className="small opacity-50 d-block">Portal UID</span>
                                                        <span className="small fw-bold opacity-75">{a.username}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {(user?.role === "admin" || user?.role === "hod") && (
                                                <div className="d-flex gap-2 mt-4">
                                                    <button
                                                        className="btn btn-outline-light flex-grow-1 py-2 text-sm"
                                                        style={{ fontSize: '0.8rem', borderRadius: '12px' }}
                                                        onClick={() => handleEdit(a)}
                                                    >
                                                        Edit Record
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger flex-grow-1"
                                                        style={{ fontSize: '0.8rem', borderRadius: '12px', color: '#ff4d4d', borderColor: '#ff4d4d' }}
                                                        onClick={() => handleDelete(a._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5 w-100">
                                    <h3 className="text-white opacity-25">No advisors currently assigned.</h3>
                                </div>
                            )}
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

                {/* Edit Modal */}
                {editingAdvisor && (
                    <div className="modal-overlay" onClick={() => setEditingAdvisor(null)}>
                        <div className="edit-modal-content" onClick={e => e.stopPropagation()} style={{ width: '450px' }}>
                            <h4 className="mb-4 text-center fw-bold text-dark">Update Advisor</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Advisor Name</label>
                                    <input
                                        className="form-control"
                                        value={editingAdvisor.name || ""}
                                        onChange={e => setEditingAdvisor({ ...editingAdvisor, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Portal Username</label>
                                    <input
                                        className="form-control"
                                        value={editingAdvisor.username || ""}
                                        onChange={e => setEditingAdvisor({ ...editingAdvisor, username: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold">Class</label>
                                        <input
                                            className="form-control"
                                            value={editingAdvisor.advisoryClass || ""}
                                            onChange={e => setEditingAdvisor({ ...editingAdvisor, advisoryClass: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold">Semester</label>
                                        <input
                                            className="form-control"
                                            value={editingAdvisor.advisorySemester || ""}
                                            onChange={e => setEditingAdvisor({ ...editingAdvisor, advisorySemester: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mt-4">
                                    <button className="btn btn-primary-premium flex-grow-1" type="submit">Save Updates</button>
                                    <button className="btn btn-light flex-grow-1" type="button" onClick={() => setEditingAdvisor(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <style>{`
                    .advisor-card-glass:hover {
                        transform: translateY(-8px);
                        background: rgba(255, 255, 255, 0.1);
                        border-color: rgba(214, 255, 101, 0.4);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    }
                    .modal-overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                        display: flex; align-items: center; justify-content: center; z-index: 9999;
                    }
                    .edit-modal-content {
                        background: white; padding: 40px; border-radius: 30px; 
                        box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                    }
                    .btn-primary-premium {
                        background: linear-gradient(135deg, #d6ff65 0%, #b8e63a 100%) !important;
                        border: none !important;
                        color: #1a2a3a !important;
                        font-weight: 800 !important;
                        border-radius: 12px !important;
                        transition: 0.3s;
                    }
                    .btn-primary-premium:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(184, 230, 58, 0.3);
                    }
                `}</style>
            </div>
        </>
    );
}

export default ViewAdvisors;
