import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";

function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        registerNo: "",
        semester: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, department: "Computer Science", role: "student" }),
            });
            if (res.ok) {
                alert("Student Added Successfully");
                navigate("/viewstudents");
            } else {
                alert("Failed to add student");
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
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
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '100px 20px 40px'
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div
                                className="glass-form-card"
                                style={{
                                    background: "rgba(255, 255, 255, 0.15)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    borderRadius: "30px",
                                    padding: "50px",
                                    color: "white",
                                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                                }}
                            >
                                <div className="text-center mb-4">
                                    <h2 style={{ fontWeight: "800", color: "#d6ff65" }}>Enroll Student</h2>
                                    <p className="opacity-75">Computer Science Department | Registry</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Full Name</label>
                                        <div className="col-sm-8">
                                            <input name="name" className="form-control-premium w-100" placeholder="Enter student name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Register Number</label>
                                        <div className="col-sm-8">
                                            <input name="registerNo" className="form-control-premium w-100" placeholder="e.g. CS2024001" value={formData.registerNo} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Semester Level</label>
                                        <div className="col-sm-8">
                                            <select name="semester" className="form-select-premium w-100" value={formData.semester} onChange={handleChange} required>
                                                <option value="">Select Semester</option>
                                                {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Username</label>
                                        <div className="col-sm-8">
                                            <input name="username" className="form-control-premium w-100" placeholder="Portal username" value={formData.username} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Access Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" name="password" className="form-control-premium w-100" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary-premium w-100 mb-3" type="submit">Complete Enrollment</button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-light w-100"
                                        style={{ borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.2)" }}
                                        onClick={() => {
                                            const role = JSON.parse(localStorage.getItem("user"))?.role;
                                            if (role === "admin") navigate("/adminhome");
                                            else if (role === "hod" || role === "faculty") navigate("/faculty");
                                            else if (role === "advisor") navigate("/advisorhome");
                                            else navigate("/");
                                        }}
                                    >
                                        Discard & Exit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .form-control-premium, .form-select-premium {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    border-radius: 12px !important;
                    padding: 12px 15px !important;
                    color: white !important;
                    transition: 0.3s;
                }
                .form-control-premium::placeholder { color: rgba(255, 255, 255, 0.3); }
                .form-control-premium:focus, .form-select-premium:focus {
                    background: rgba(255, 255, 255, 0.15) !important;
                    border-color: #d6ff65 !important;
                    box-shadow: 0 0 15px rgba(214, 255, 101, 0.2);
                }
                .btn-primary-premium {
                    background: #d6ff65 !important;
                    border: none !important;
                    color: #1a2a3a !important;
                    font-weight: 700 !important;
                    padding: 15px !important;
                    border-radius: 12px !important;
                    transition: 0.3s;
                }
                .btn-primary-premium:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(214, 255, 101, 0.4);
                }
                .form-select-premium option {
                    background: #1a2a3a;
                    color: white;
                }
            `}</style>
        </>
    );
}

export default AddStudent;
