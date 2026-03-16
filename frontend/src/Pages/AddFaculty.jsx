import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";
import { toast } from "react-toastify";

function AddFaculty() {
    const navigate = useNavigate();

    const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
    const batches = ["2022-2026", "2023-2027", "2024-2028"];

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        department: "Computer Science",
        isAdvisor: false,
        advisoryClass: "",
        advisorySemester: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role: formData.isAdvisor ? "advisor" : "faculty",
                }),
            });

            if (res.ok) {
                toast.success("Faculty added to registry!");
                setFormData({
                    name: "", username: "", password: "", department: "Computer Science",
                    isAdvisor: false, advisoryClass: "", advisorySemester: ""
                });
            } else {
                toast.error("Registration error");
            }
        } catch (err) {
            toast.error("Network failure");
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
                        <div className="col-lg-6 col-md-9">
                            <div 
                                className="glass-form-card"
                                style={{
                                    background: "rgba(255, 255, 255, 0.12)",
                                    backdropFilter: "blur(25px)",
                                    WebkitBackdropFilter: "blur(25px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    borderRadius: "32px",
                                    padding: "45px",
                                    color: "white",
                                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)"
                                }}
                            >
                                <div className="text-center mb-5">
                                    <div className="d-inline-block p-3 mb-3" style={{ background: "rgba(214, 255, 101, 0.1)", borderRadius: "20px" }}>
                                        <h1 style={{ fontSize: "2rem", margin: 0 }}>👩‍🏫</h1>
                                    </div>
                                    <h2 style={{ fontWeight: "800", color: "#d6ff65" }}>Faculty Enrollment</h2>
                                    <p className="opacity-75">Register New Department Personnel</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Full Name</label>
                                        <div className="col-sm-8">
                                            <input name="name" className="form-control-premium w-100" placeholder="e.g. Prof. Alan Turing" onChange={handleChange} value={formData.name} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Username</label>
                                        <div className="col-sm-8">
                                            <input name="username" className="form-control-premium w-100" placeholder="Username" onChange={handleChange} value={formData.username} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" name="password" className="form-control-premium w-100" placeholder="Password" onChange={handleChange} value={formData.password} required />
                                        </div>
                                    </div>

                                    <div className="form-check form-switch mb-4 p-3 ps-5" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "14px" }}>
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="isAdvisor" 
                                            name="isAdvisor" 
                                            checked={formData.isAdvisor} 
                                            onChange={handleChange} 
                                        />
                                        <label className="form-check-label fw-bold text-white ms-2" htmlFor="isAdvisor">
                                            Assign Advisory Responsibilities
                                        </label>
                                    </div>

                                    {formData.isAdvisor && (
                                        <div className="animate-fade-in">
                                            <div className="mb-3 row align-items-center">
                                                <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Mentorship Batch</label>
                                                <div className="col-sm-8">
                                                    <select name="advisoryClass" className="form-select-premium w-100" value={formData.advisoryClass} onChange={handleChange} required>
                                                        <option value="">Select Batch</option>
                                                        {batches.map(v => <option key={v} value={v}>{v}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 row align-items-center">
                                                <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Target Semester</label>
                                                <div className="col-sm-8">
                                                    <select name="advisorySemester" className="form-select-premium w-100" value={formData.advisorySemester} onChange={handleChange} required>
                                                        <option value="">Select Sem</option>
                                                        {semesters.map(v => <option key={v} value={v}>{v}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button className="btn btn-primary-premium w-100 mb-4" type="submit">Submit Registry</button>
                                    
                                    <button
                                        type="button"
                                        className="btn btn-link w-100 text-light text-decoration-none opacity-50"
                                        style={{ fontSize: "0.9rem" }}
                                        onClick={() => navigate(-1)}
                                    >
                                        ← Back to Configuration Room
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .form-control-premium, .form-select-premium {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    border-radius: 14px !important;
                    padding: 12px 16px !important;
                    color: white !important;
                    transition: 0.3s;
                }
                .form-select-premium option { background: #1a2a3a; }
                .form-control-premium:focus {
                    background: rgba(255, 255, 255, 0.12) !important;
                    border-color: #d6ff65 !important;
                    outline: none;
                    box-shadow: 0 0 15px rgba(214,255,101,0.2);
                }
                .btn-primary-premium {
                    background: #d6ff65 !important;
                    border: none !important;
                    color: #1a2a3a !important;
                    font-weight: 800 !important;
                    padding: 14px !important;
                    border-radius: 14px !important;
                    transition: 0.3s;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .btn-primary-premium:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(214, 255, 101, 0.3);
                }
                .form-check-input:checked { background-color: #d6ff65; border-color: #d6ff65; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </>
    );
}

export default AddFaculty;
