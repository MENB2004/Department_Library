import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";
import { toast } from "react-toastify";

function ViewFaculty() {
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState([]);

    const [editingFaculty, setEditingFaculty] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = () => {
        fetch("https://department-library-api.onrender.com/api/users")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFaculty(data.filter((u) => (u.role === "faculty" || u.role === "advisor") && u.department === "Computer Science"));
                } else {
                    setFaculty([]);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setFaculty([]);
            });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this faculty member?")) return;
        try {
            const res = await fetch(`https://department-library-api.onrender.com/api/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Faculty member removed");
                fetchFaculty();
            }
        } catch (err) {
            toast.error("Error removing faculty");
        }
    };

    const handleEdit = (f) => {
        setEditingFaculty({ ...f });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://department-library-api.onrender.com/api/users/${editingFaculty._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingFaculty),
            });
            if (res.ok) {
                toast.success("Profile updated");
                setEditingFaculty(null);
                fetchFaculty();
            }
        } catch (err) {
            toast.error("Error updating profile");
        }
    };

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
                                Academic Personnel
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Faculty <span style={{ color: "#d6ff65" }}>Registry</span></h1>
                            <p className="text-light opacity-75 mt-2">Computer Science Department | Teaching & Advisory Staff</p>
                        </div>

                        <div className="row g-4">
                            {faculty.map((f) => (
                                <div key={f._id} className="col-lg-4 col-md-6">
                                    <div
                                        className="faculty-card-glass h-100 p-4"
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
                                                👨‍🏫
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-0">{f.name}</h5>
                                                <span className="small opacity-50 text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>{f.role}</span>
                                            </div>
                                        </div>

                                        <div className="p-3" style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <div className="mb-2">
                                                <span className="small opacity-50 d-block">Department</span>
                                                <span className="small fw-bold">Computer Science</span>
                                            </div>
                                            {f.isAdvisor && (
                                                <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <span className="small opacity-50 d-block">Class</span>
                                                            <span className="small fw-bold">{f.advisoryClass}</span>
                                                        </div>
                                                        <div className="text-end">
                                                            <span className="small opacity-50 d-block">Semester</span>
                                                            <span className="small fw-bold">{f.advisorySemester}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {(user?.role === "admin" || user?.role === "hod") && (
                                            <div className="d-flex gap-2 mt-4">
                                                <button
                                                    className="btn btn-outline-light flex-grow-1 py-2 text-sm"
                                                    style={{ fontSize: '0.8rem', borderRadius: '12px' }}
                                                    onClick={() => handleEdit(f)}
                                                >
                                                    Edit Profile
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger flex-grow-1"
                                                    style={{ fontSize: '0.8rem', borderRadius: '12px', color: '#ff4d4d', borderColor: '#ff4d4d' }}
                                                    onClick={() => handleDelete(f._id)}
                                                >
                                                    Deactivate
                                                </button>
                                            </div>
                                        )}
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
                                Back to Portal
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {editingFaculty && (
                    <div className="modal-overlay" onClick={() => setEditingFaculty(null)}>
                        <div className="edit-modal-content" onClick={e => e.stopPropagation()} style={{ width: '450px' }}>
                            <h4 className="mb-4 text-center fw-bold text-dark">Update Personnel</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Full Name</label>
                                    <input
                                        className="form-control"
                                        value={editingFaculty.name || ""}
                                        onChange={e => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Portal Username</label>
                                    <input
                                        className="form-control"
                                        value={editingFaculty.username || ""}
                                        onChange={e => setEditingFaculty({ ...editingFaculty, username: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="p-3 mb-4" style={{ background: "#f8f9fa", borderRadius: "16px", border: "1px solid #eee" }}>
                                    <div className="form-check form-switch mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="advisorSwitch"
                                            checked={editingFaculty.isAdvisor || false}
                                            onChange={e => {
                                                const checked = e.target.checked;
                                                setEditingFaculty({
                                                    ...editingFaculty,
                                                    isAdvisor: checked,
                                                    role: checked ? "advisor" : "faculty"
                                                });
                                            }}
                                        />
                                        <label className="form-check-label fw-bold text-dark" htmlFor="advisorSwitch">
                                            Designate as Class Advisor
                                        </label>
                                    </div>

                                    {editingFaculty.isAdvisor && (
                                        <div className="row g-2">
                                            <div className="col-4">
                                                <label className="text-muted small fw-bold">Class</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    value={editingFaculty.advisoryClass || ""}
                                                    onChange={e => setEditingFaculty({ ...editingFaculty, advisoryClass: e.target.value })}
                                                    placeholder="e.g. CS-A"
                                                    required
                                                />
                                            </div>
                                            <div className="col-4">
                                                <label className="text-muted small fw-bold">Sem</label>
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={editingFaculty.advisorySemester || "S1"}
                                                    onChange={e => setEditingFaculty({ ...editingFaculty, advisorySemester: e.target.value })}
                                                >
                                                    {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <label className="text-muted small fw-bold">Batch</label>
                                                <input
                                                    className="form-control form-control-sm"
                                                    value={editingFaculty.batch || ""}
                                                    onChange={e => setEditingFaculty({ ...editingFaculty, batch: e.target.value })}
                                                    placeholder="2022-26"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex gap-2 mt-4">
                                    <button className="btn btn-primary-premium flex-grow-1" type="submit">Update Record</button>
                                    <button className="btn btn-light flex-grow-1" type="button" onClick={() => setEditingFaculty(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <style>{`
                    .faculty-card-glass:hover {
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

export default ViewFaculty;
