import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goDashboard = () => {
    if (!user) return;

    if (user.role === "admin") navigate("/adminhome");
    else if (user.role === "advisor") navigate("/advisorhome");
    else if (user.role === "hod" || user.role === "faculty") navigate("/faculty");
    else if (user.role === "student") navigate("/studenthome");
  };

  return (
    <nav
      className="navbar sticky-top"
      style={{
        background: "rgba(44, 62, 80, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 1050,
      }}
    >
      {/* Project Title */}
      <div 
        className="d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={goDashboard}
      >
        <span
          style={{
            color: "#d6ff65",
            fontWeight: "800",
            fontSize: "22px",
            letterSpacing: "1px",
            textTransform: "uppercase"
          }}
        >
          CS
        </span>
        <span
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: "18px",
            marginLeft: "8px",
            opacity: 0.9
          }}
        >
          Department Library
        </span>
      </div>

      {/* Account Dropdown */}
      {user && (
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(!open)}
            className="header-user-badge"
            style={{
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "0.3s ease"
            }}
          >
            <span style={{ marginRight: "8px" }}>👤</span>
            <span className="d-none d-sm-inline">{user.name} </span>
            <small style={{ color: "#d6ff65", marginLeft: "5px", fontSize: "11px", textTransform: "uppercase" }}>({user.role})</small>
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(5px)",
                borderRadius: "15px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                width: "200px",
                padding: "8px",
                zIndex: 1000,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                animation: "slideIn 0.3s ease-out"
              }}
            >
              <div
                className="dropdown-item-custom"
                style={{ 
                    padding: "12px 15px", 
                    cursor: "pointer", 
                    borderRadius: "10px",
                    fontWeight: "500",
                    color: "#2c3e50",
                    transition: "0.2s"
                }}
                onClick={() => { goDashboard(); setOpen(false); }}
              >
                🏠 Dashboard
              </div>

              <div
                className="dropdown-item-custom text-danger"
                style={{ 
                    padding: "12px 15px", 
                    cursor: "pointer", 
                    borderRadius: "10px",
                    fontWeight: "600",
                    transition: "0.2s",
                    borderTop: "1px solid #eee",
                    marginTop: "5px"
                }}
                onClick={logout}
              >
                Logout 🚪
              </div>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        .header-user-badge:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }
        .dropdown-item-custom:hover {
          background: rgba(44, 62, 80, 0.05);
          color: #007bff !important;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

export default Header;