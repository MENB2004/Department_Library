import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg3 from "../assets/bg3.png";
import { toast } from "react-toastify";

function SyllabusMapping() {
    const navigate = useNavigate();
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [semester, setSemester] = useState("");
    const [syllabusContent, setSyllabusContent] = useState("");
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [syllabuses, setSyllabuses] = useState([]);

    useEffect(() => {
        fetchBooks();
        fetchSyllabuses();
    }, []);

    const fetchBooks = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
        const data = await res.json();
        setBooks(data);
    };

    const fetchSyllabuses = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/syllabus`);
        const data = await res.json();
        setSyllabuses(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/syllabus`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subjectName, subjectCode, semester, department: "Computer Science", syllabusContent })
        });
        if (res.ok) {
            toast.success("Syllabus Cataloged!");
            setSubjectName("");
            setSubjectCode("");
            fetchSyllabuses();
        }
    };

    const mapBook = async (syllabusId) => {
        if (!selectedBook) return toast.error("Choose a reference book first");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/syllabus/${syllabusId}/map-book`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookId: selectedBook })
        });
        if (res.ok) {
            toast.success("Reference Linked!");
            fetchSyllabuses();
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
                    width: '100%'
                }}
            >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.65)', minHeight: '100vh', padding: '100px 20px 40px' }}>
                    <div className="container" style={{ marginTop: "100px" }}>
                        <div className="glass-panel text-center mb-5 p-5" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                            <div className="d-inline-block px-4 py-2 mb-3" style={{ background: "rgba(214, 255, 101, 0.15)", borderRadius: "100px", color: "#d6ff65", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px" }}>
                                Curricula Management
                            </div>
                            <h1 style={{ fontWeight: "900", color: "white", fontSize: "3rem", letterSpacing: "-1.5px" }}>Syllabus <span style={{ color: "#d6ff65" }}>Mapping</span></h1>
                            <p className="text-light opacity-75 mt-2">Connect academic subjects with recommended library resources</p>
                        </div>

                        <div className="row g-4">
                            <div className="col-lg-5">
                                <div className="glass-card p-4" style={{ borderRadius: "24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                    <h4 className="fw-bold text-white mb-4">Build New Map</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input className="form-control-premium w-100" placeholder="Subject Name" value={subjectName} onChange={e => setSubjectName(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-control-premium w-100" placeholder="Subject Code (e.g. CST301)" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select-premium w-100" value={semester} onChange={e => setSemester(e.target.value)} required>
                                                <option value="">Semester Level</option>
                                                {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <textarea className="form-control-premium w-100" rows="3" placeholder="Syllabus Content or URL" value={syllabusContent} onChange={e => setSyllabusContent(e.target.value)} />
                                        </div>
                                        <button className="btn-primary-premium w-100">Establish Subject</button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <div className="glass-card p-4 h-100" style={{ borderRadius: "24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                    <h4 className="fw-bold text-white mb-4">Linking Registry</h4>
                                    <div className="mb-4">
                                        <select className="form-select-premium w-100" style={{ borderColor: "#d6ff65" }} onChange={e => setSelectedBook(e.target.value)}>
                                            <option value="">Target Book to Map</option>
                                            {books.map(b => <option key={b._id} value={b._id}>{b.title} ({b.author})</option>)}
                                        </select>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table-premium w-100">
                                            <thead>
                                                <tr>
                                                    <th>Code / Subject</th>
                                                    <th>Sem</th>
                                                    <th>Mapped Resources</th>
                                                    <th className="text-end">Link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {syllabuses.map(s => (
                                                    <tr key={s._id}>
                                                        <td>
                                                            <div className="fw-bold text-white">{s.subjectCode}</div>
                                                            <div className="small opacity-50">{s.subjectName}</div>
                                                        </td>
                                                        <td><span className="badge-sem">{s.semester}</span></td>
                                                        <td>
                                                            <div className="small text-white">
                                                                {s.mappedBooks.length > 0 ? s.mappedBooks.map(b => b.title).join(", ") : <span className="opacity-25 italic">No resources</span>}
                                                            </div>
                                                        </td>
                                                        <td className="text-end">
                                                            <button className="btn-action-map" onClick={() => mapBook(s._id)}>🔗</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-5">
                            <button
                                className="btn btn-link text-light text-decoration-none opacity-50 hover-opacity-100"
                                onClick={() => navigate(-1)}
                            >
                                ← Return to Previous
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .form-control-premium, .form-select-premium {
                        background: rgba(255, 255, 255, 0.08) !important;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        border-radius: 14px !important;
                        padding: 12px 16px !important;
                        color: white !important;
                    }
                    .form-select-premium option { background: #1a2a3a; }
                    .btn-primary-premium {
                        background: #d6ff65;
                        color: #1a2a3a;
                        padding: 14px;
                        border-radius: 14px;
                        border: none;
                        font-weight: 800;
                        transition: 0.3s;
                    }
                    .btn-primary-premium:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(214, 255, 101, 0.3); }
                    .table-premium th { color: #d6ff65; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .table-premium td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                    .badge-sem { background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; }
                    .btn-action-map { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; width: 32px; height: 32px; color: white; transition: 0.3s; }
                    .btn-action-map:hover { background: #d6ff65; color: #1a2a3a; transform: scale(1.1); }
                    .hover-opacity-100:hover { opacity: 1 !important; }
                `}</style>
            </div>
        </>
    );
}

export default SyllabusMapping;
