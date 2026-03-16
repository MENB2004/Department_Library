import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";
import { toast } from "react-toastify";

function ViewBooks() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const semesterParam = searchParams.get("sem");

    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, [semesterParam]);

    const fetchBooks = () => {
        const url = `${import.meta.env.VITE_API_URL}/api/books${semesterParam ? `?semester=${semesterParam}` : ""}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const filtered = data.filter(book => book.department === "Computer Science");
                    setBooks(filtered);
                } else {
                    setBooks([]);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setBooks([]);
            });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this book?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Book deleted");
                fetchBooks();
            }
        } catch (err) {
            toast.error("Error deleting book");
        }
    };

    const handleEdit = (book) => {
        setEditingBook({ ...book });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${editingBook._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingBook),
            });
            if (res.ok) {
                toast.success("Book updated");
                setEditingBook(null);
                fetchBooks();
            }
        } catch (err) {
            toast.error("Error updating book");
        }
    };

    const handleBorrow = async (bookId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/borrowing/issue`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    bookId,
                    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
                }),
            });
            if (res.ok) {
                toast.success("Book borrowed successfully");
                fetchBooks();
            } else {
                const data = await res.json();
                toast.error(data.message || "Borrowing failed");
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

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
                        <div className="glass-panel text-center mb-5 p-4" style={{ borderRadius: "24px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Library <span style={{ color: "#d6ff65" }}>Catalog</span></h1>
                            <p className="text-light opacity-75 mt-2">Computer Science Resources | {semesterParam ? `Semester ${semesterParam}` : "Full Collection"}</p>

                            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                                {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => navigate(`/viewbooks?sem=${sem}`)}
                                        className="btn btn-sm"
                                        style={{
                                            background: semesterParam === sem ? "#d6ff65" : "rgba(255,255,255,0.1)",
                                            color: semesterParam === sem ? "#1a2a3a" : "white",
                                            borderRadius: "10px",
                                            fontWeight: "700",
                                            padding: "8px 15px",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            transition: "0.3s"
                                        }}
                                    >
                                        {sem}
                                    </button>
                                ))}
                                <button
                                    onClick={() => navigate(`/viewbooks`)}
                                    className="btn btn-sm"
                                    style={{
                                        background: !semesterParam ? "#d6ff65" : "rgba(255,255,255,0.1)",
                                        color: !semesterParam ? "#1a2a3a" : "white",
                                        borderRadius: "10px",
                                        fontWeight: "700",
                                        padding: "8px 15px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        transition: "0.3s"
                                    }}
                                >
                                    All
                                </button>
                            </div>
                        </div>

                        <div className="search-bar-container mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                            <input
                                className="form-control-premium w-100"
                                placeholder="🔍 Search titles or authors..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="row g-4">
                            {filteredBooks.map((book) => (
                                <div key={book._id} className="col-md-6 col-lg-4">
                                    <div
                                        className="book-card-glass h-100"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.08)",
                                            backdropFilter: "blur(15px)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                            borderRadius: "24px",
                                            padding: "30px",
                                            transition: "0.3s ease",
                                            color: "white"
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge" style={{ background: "rgba(214, 255, 101, 0.2)", color: "#d6ff65", borderRadius: "8px", padding: "6px 12px" }}>
                                                {book.semester}
                                            </span>
                                            <span className="opacity-50 small">ID: {book._id.slice(-6).toUpperCase()}</span>
                                        </div>
                                        <h4 className="fw-bold mb-2">{book.title}</h4>
                                        <p className="opacity-75 mb-4">by {book.author}</p>

                                        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <span className="d-block small opacity-50 text-uppercase fw-bold">Availability</span>
                                                    <span className="fw-bold" style={{ color: book.availableCopies > 0 ? "#d6ff65" : "#ff4d4d" }}>
                                                        {book.availableCopies} / {book.totalCopies} Copies
                                                    </span>
                                                </div>
                                                <div className="status-dot" style={{
                                                    width: "12px",
                                                    height: "12px",
                                                    borderRadius: "50%",
                                                    background: book.availableCopies > 0 ? "#d6ff65" : "#ff4d4d",
                                                    boxShadow: `0 0 10px ${book.availableCopies > 0 ? "#d6ff65" : "#ff4d4d"}`
                                                }}></div>
                                            </div>

                                            <div className="d-flex gap-2 mt-2">
                                                {(user?.role === "admin" || user?.role === "hod") ? (
                                                    <>
                                                        <button
                                                            className="btn btn-outline-light flex-grow-1"
                                                            style={{ padding: '8px', fontSize: '14px', borderRadius: '10px' }}
                                                            onClick={() => handleEdit(book)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger flex-grow-1"
                                                            style={{ padding: '8px', fontSize: '14px', borderRadius: '10px', color: '#ff4d4d', borderColor: '#ff4d4d' }}
                                                            onClick={() => handleDelete(book._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary-premium flex-grow-1 py-2 text-sm"
                                                        style={{ fontSize: '0.8rem' }}
                                                        disabled={book.availableCopies <= 0}
                                                        onClick={() => handleBorrow(book._id)}
                                                    >
                                                        {book.availableCopies > 0 ? "Request Issue" : "Out of Stock"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredBooks.length === 0 && (
                            <div className="text-center py-5">
                                <h3 className="text-white opacity-25">No matching resources found.</h3>
                            </div>
                        )}

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-outline-light px-5 py-3"
                                style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)" }}
                                onClick={() => {
                                    const role = JSON.parse(localStorage.getItem("user"))?.role;
                                    if (role === "admin") navigate("/adminhome");
                                    else if (role === "hod" || role === "faculty") navigate("/faculty");
                                    else if (role === "advisor") navigate("/advisorhome");
                                    else if (role === "student") navigate("/studenthome");
                                    else navigate("/");
                                }}
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {editingBook && (
                    <div className="modal-overlay" onClick={() => setEditingBook(null)}>
                        <div className="edit-modal-content" onClick={e => e.stopPropagation()} style={{ width: '500px' }}>
                            <h4 className="mb-4 text-center fw-bold text-dark">Update Resource Details</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Book Title</label>
                                    <input
                                        className="form-control"
                                        value={editingBook.title || ""}
                                        onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-muted small fw-bold">Author Name</label>
                                    <input
                                        className="form-control"
                                        value={editingBook.author || ""}
                                        onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold">Total Copies</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editingBook.totalCopies || 0}
                                            onChange={e => {
                                                const total = parseInt(e.target.value) || 0;
                                                const diff = total - (editingBook.totalCopies || 0);
                                                setEditingBook({
                                                    ...editingBook,
                                                    totalCopies: total,
                                                    availableCopies: (editingBook.availableCopies || 0) + diff
                                                });
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold">Semester</label>
                                        <select
                                            className="form-select"
                                            value={editingBook.semester || "S1"}
                                            onChange={e => setEditingBook({ ...editingBook, semester: e.target.value })}
                                        >
                                            {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mt-4">
                                    <button className="btn btn-primary-premium flex-grow-1" type="submit" style={{ boxShadow: 'none' }}>Save Changes</button>
                                    <button className="btn btn-light flex-grow-1" type="button" onClick={() => setEditingBook(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <style>{`
                    .book-card-glass:hover {
                        transform: translateY(-10px);
                        background: rgba(255, 255, 255, 0.12);
                        border-color: rgba(214, 255, 101, 0.4);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    }
                    .form-control-premium {
                        background: rgba(255, 255, 255, 0.08) !important;
                        border: 1px solid rgba(255, 255, 255, 0.15) !important;
                        border-radius: 14px !important;
                        padding: 14px 18px !important;
                        color: white !important;
                        transition: 0.3s;
                    }
                    .form-control-premium:focus {
                        background: rgba(255, 255, 255, 0.12) !important;
                        border-color: #d6ff65 !important;
                        box-shadow: 0 0 20px rgba(214, 255, 101, 0.2);
                        outline: none;
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

export default ViewBooks;
