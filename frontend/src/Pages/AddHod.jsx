import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";
import { toast } from "react-toastify";

function AddHod() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        department: "Computer Science",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "hod" }),
            });

            if (res.ok) {
                toast.success("HOD Registered Successfully");
                setFormData({ name: "", username: "", password: "", department: "Computer Science" });
            } else {
                toast.error("Registration failed");
            }
        } catch (err) {
            toast.error("Server connection error");
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
                        <div className="col-lg-5 col-md-8">
                            <div 
                                className="glass-form-card"
                                style={{
                                    background: "rgba(255, 255, 255, 0.12)",
                                    backdropFilter: "blur(25px)",
                                    WebkitBackdropFilter: "blur(25px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    borderRadius: "32px",
                                    padding: "50px",
                                    color: "white",
                                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)"
                                }}
                            >
                                <div className="text-center mb-5">
                                    <div className="d-inline-block p-3 mb-3" style={{ background: "rgba(214, 255, 101, 0.1)", borderRadius: "20px" }}>
                                        <h1 style={{ fontSize: "2rem", margin: 0 }}>🏛️</h1>
                                    </div>
                                    <h2 style={{ fontWeight: "800", color: "#d6ff65" }}>HOD Appointment</h2>
                                    <p className="opacity-75">Assign Department Leadership Credentials</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">HOD Name</label>
                                        <div className="col-sm-8">
                                            <input 
                                                name="name" 
                                                className="form-control-premium w-100" 
                                                placeholder="e.g. Dr. Ada Lovelace" 
                                                value={formData.name}
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Portal Username</label>
                                        <div className="col-sm-8">
                                            <input 
                                                name="username" 
                                                className="form-control-premium w-100" 
                                                placeholder="e.g. hod_cs" 
                                                value={formData.username}
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0 text-start">Access Password</label>
                                        <div className="col-sm-8">
                                            <input 
                                                type="password" 
                                                name="password" 
                                                className="form-control-premium w-100" 
                                                placeholder="Input secure access key" 
                                                value={formData.password}
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary-premium w-100 mb-4 mt-2" type="submit">Establish Leadership</button>
                                    
                                    <button
                                        type="button"
                                        className="btn btn-link w-100 text-light text-decoration-none opacity-50"
                                        style={{ fontSize: "0.9rem" }}
                                        onClick={() => navigate(-1)}
                                    >
                                        ← Cancel and Return
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .form-control-premium {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    border-radius: 14px !important;
                    padding: 14px 18px !important;
                    color: white !important;
                    transition: all 0.3s ease;
                }
                .form-control-premium::placeholder { color: rgba(255, 255, 255, 0.25); }
                .form-control-premium:focus {
                    background: rgba(255, 255, 255, 0.12) !important;
                    border-color: #d6ff65 !important;
                    box-shadow: 0 0 20px rgba(214, 255, 101, 0.2);
                    outline: none;
                }
                .btn-primary-premium {
                    background: linear-gradient(135deg, #d6ff65 0%, #b8e63a 100%) !important;
                    border: none !important;
                    color: #1a2a3a !important;
                    font-weight: 800 !important;
                    padding: 16px !important;
                    border-radius: 14px !important;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .btn-primary-premium:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(184, 230, 58, 0.4);
                }
            `}</style>
        </>
    );
}

export default AddHod;
