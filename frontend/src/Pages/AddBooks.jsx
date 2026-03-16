import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg3 from "../assets/bg3.png";

function AddBook() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        semester: "",
        totalCopies: 1,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    department: "Computer Science",
                    availableCopies: formData.totalCopies,
                }),
            });
            if (res.ok) {
                alert("Book Added Successfully");
                navigate("/viewbooks");
            } else {
                alert("Failed to add book");
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
                    backgroundImage: `url(${bg3})`, 
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
                                        <h1 style={{ fontSize: "2rem", margin: 0 }}>📚</h1>
                                    </div>
                                    <h2 style={{ fontWeight: "800", color: "#d6ff65" }}>Add New Resource</h2>
                                    <p className="opacity-75">Library Inventory | CS Department</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Book Title</label>
                                        <div className="col-sm-8">
                                            <input name="title" className="form-control-premium w-100" placeholder="e.g. Introduction to Algorithms" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Lead Author</label>
                                        <div className="col-sm-8">
                                            <input name="author" className="form-control-premium w-100" placeholder="e.g. Thomas H. Cormen" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Curriculum Sem</label>
                                        <div className="col-sm-8">
                                            <select name="semester" className="form-select-premium w-100" onChange={handleChange} required>
                                                <option value="">Select Sem</option>
                                                {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-4 form-label fw-bold opacity-75 mb-0">Total Stock</label>
                                        <div className="col-sm-8">
                                            <input type="number" name="totalCopies" className="form-control-premium w-100" placeholder="Qty" min="1" onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary-premium w-100 mb-4 mt-3" type="submit">Catalog Resource</button>
                                    
                                    <button
                                        type="button"
                                        className="btn btn-outline-light w-100"
                                        style={{ borderRadius: "14px", padding: "12px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}
                                        onClick={() => {
                                            const role = JSON.parse(localStorage.getItem("user"))?.role;
                                            if (role === "admin") navigate("/adminhome");
                                            else if (role === "hod" || role === "faculty") navigate("/faculty");
                                            else if (role === "advisor") navigate("/advisorhome");
                                            else navigate("/");
                                        }}
                                    >
                                        Back to Overview
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
                    padding: 14px 18px !important;
                    color: white !important;
                    transition: all 0.3s ease;
                }
                .form-control-premium::placeholder { color: rgba(255, 255, 255, 0.25); }
                .form-control-premium:focus, .form-select-premium:focus {
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
                .form-select-premium option {
                    background: #1a2a3a;
                    color: white;
                }
            `}</style>
        </>
    );
}

export default AddBook;
