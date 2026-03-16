import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // 🔥 Role Based Redirect
                switch (data.user.role) {
                    case "admin":
                        navigate("/adminhome");
                        break;
                    case "advisor":
                        navigate("/advisorhome");
                        break;
                    case "hod":
                        navigate("/faculty");
                        break;
                    case "faculty":
                        navigate("/faculty");
                        break;
                    case "student":
                        navigate("/studenthome");
                        break;
                    default:
                        navigate("/");
                }
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    return (
        <>
            <style>{`
        .signup-page {
        background: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f") center/cover no-repeat;
        min-height: 100vh;
        }

        .signin-btn {
        height: 50px;
        border-radius: 12px;
        border: none;
        font-size: 18px;
          font-weight: 600;
          color: white;
          background: linear-gradient(90deg, #b347e6, #6f3df4);
          box-shadow: 0 6px 18px rgba(111,61,244,0.35);
          transition: 0.3s;
        }

        .signin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(111,61,244,0.45);
        }

        .image-section {
          background: url("https://tse1.mm.bing.net/th/id/OIP.M4hXrjwyWCPdI85RgXQyPQHaEo?w=1920&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3") center/cover no-repeat;
          position: relative;
          min-height: 500px;
        }

        .image-section .overlay {
          position: absolute;
          inset: 0;
          background: rgba(30, 22, 39, 0.38);
        }
      `}</style>

            <div className="signup-page">
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div
                        className="row g-0 shadow-lg"
                        style={{
                            borderRadius: "16px",
                            width: "850px",
                            overflow: "hidden",
                            backgroundColor: "white",
                        }}
                    >
                        {/* Left Section (Form) */}
                        <div className="col-md-6 bg-light p-5">
                            <h2
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "20px",
                                    color: "#3c3c46",
                                }}
                            >
                                CS Department Library Management
                            </h2>

                            <h3
                                className="mb-4"
                                style={{ fontWeight: "600", color: "#3c3c46" }}
                            >
                                Login 📚
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button className="btn signin-btn w-100">
                                    Sign In
                                </button>
                            </form>
                        </div>

                        {/* Right Section (Image) */}
                        <div className="col-md-6 image-section">
                            <div className="overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
