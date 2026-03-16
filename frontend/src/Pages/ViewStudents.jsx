import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";

function ViewStudents() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [filterSem, setFilterSem] = useState(searchParams.get("sem") || "");
    const [search, setSearch] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, [filterSem]);

    const fetchStudents = async () => {
        try {
            const url = `https://department-library-api.onrender.com/api/students?department=Computer Science${filterSem ? `&semester=${filterSem}` : ""}`;
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                setStudents([]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setStudents([]);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        await fetch(`https://department-library-api.onrender.com/api/students/${id}`, { method: "DELETE" });
        fetchStudents();
    };

    const handleEdit = (student) => {
        setEditingStudent({ ...student });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await fetch(`https://department-library-api.onrender.com/api/students/${editingStudent._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingStudent),
        });
        setEditingStudent(null);
        fetchStudents();
    };

    const filtered = students.filter(s =>
        (filterSem ? s.semester === filterSem : true) &&
        (
            (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (s.registerNo || "").includes(search)
        )
    );

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
                        <div className="glass-panel text-center mb-5 p-4" style={{ borderRadius: "20px" }}>
                            <h1 style={{ fontWeight: "800", color: "white" }}>Students <span style={{ color: "#d6ff65" }}>Registry</span></h1>
                            <p className="text-light opacity-75">Computer Science Department | Academic Records Management</p>
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <input
                                    className="form-control-premium w-100"
                                    placeholder="🔍 Search name or register number..."
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <select
                                    className="form-select-premium w-100"
                                    value={filterSem}
                                    onChange={(e) => setFilterSem(e.target.value)}
                                >
                                    <option value="">All Semesters</option>
                                    {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button
                                    className="btn btn-outline-light w-100 h-100"
                                    style={{ borderRadius: "12px" }}
                                    onClick={() => {
                                        const role = JSON.parse(localStorage.getItem("user"))?.role;
                                        if (role === "admin") navigate("/adminhome");
                                        else if (role === "hod" || role === "faculty") navigate("/faculty");
                                        else if (role === "advisor") navigate("/advisorhome");
                                        else navigate("/");
                                    }}
                                >
                                    Dashboard
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive glass-panel" style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <table className="table-premium w-100">
                                <thead>
                                    <tr>
                                        <th>Register No</th>
                                        <th>Name</th>
                                        <th>Semester</th>
                                        <th>Username</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(s => (
                                        <tr key={s._id}>
                                            <td className="fw-bold" style={{ color: "#d6ff65" }}>{s.registerNo}</td>
                                            <td>{s.name}</td>
                                            <td><span className="badge-sem">{s.semester}</span></td>
                                            <td className="opacity-75">{s.username}</td>
                                            <td className="text-end">
                                                <button className="btn-action edit me-2" onClick={() => handleEdit(s)}>✏️</button>
                                                <button className="btn-action delete" onClick={() => handleDelete(s._id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && (
                                <div className="text-center py-5 text-light opacity-50">No student records found in this view.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {editingStudent && (
                    <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
                        <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
                            <h4 className="mb-4 text-center fw-bold text-dark">Update Student Profile</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Full Name</label>
                                    <input
                                        className="form-control"
                                        value={editingStudent.name || ""}
                                        onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-muted small fw-bold">Register Number</label>
                                    <input
                                        className="form-control"
                                        value={editingStudent.registerNo || ""}
                                        onChange={e => setEditingStudent({ ...editingStudent, registerNo: e.target.value })}
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success w-100 py-2" type="submit">Update</button>
                                    <button className="btn btn-light w-100 py-2" onClick={() => setEditingStudent(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <style>{`
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(15px);
                        -webkit-backdrop-filter: blur(15px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .table-premium { border-collapse: separate; border-spacing: 0; }
                    .table-premium th {
                        background: rgba(214, 255, 101, 0.15);
                        color: white;
                        text-transform: uppercase;
                        font-size: 0.75rem;
                        letter-spacing: 1.5px;
                        padding: 20px;
                        border: none;
                        font-weight: 700;
                    }
                    .table-premium td {
                        padding: 18px 20px;
                        color: white;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        vertical-align: middle;
                    }
                    .table-premium tr:hover td {
                        background: rgba(255,255,255,0.03);
                    }
                    .badge-sem {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 4px 12px;
                        border-radius: 10px;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    .btn-action {
                        border: 1px solid rgba(255,255,255,0.1);
                        background: rgba(255,255,255,0.05);
                        width: 38px;
                        height: 38px;
                        border-radius: 10px;
                        transition: 0.3s;
                        color: white;
                    }
                    .btn-action:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
                    .form-control-premium, .form-select-premium {
                        background: rgba(255, 255, 255, 0.1) !important;
                        border: 1px solid rgba(255, 255, 255, 0.2) !important;
                        border-radius: 12px !important;
                        padding: 12px 15px !important;
                        color: white !important;
                    }
                    .form-select-premium option { background: #1a2a3a; }
                    .modal-overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                        display: flex; align-items: center; justify-content: center; z-index: 9999;
                    }
                    .edit-modal-content {
                        background: white; padding: 40px; border-radius: 30px; width: 450px;
                        box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                    }
                `}</style>
            </div>
        </>
    );
}

export default ViewStudents;
