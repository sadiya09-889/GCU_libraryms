import { useState } from "react"
import { useLibrary } from "../context/LibraryContext"

function Issue() {
    const { books, issuedBooks, setIssuedBooks } = useLibrary()

    const [selectedBook, setSelectedBook] = useState("")
    const [studentName, setStudentName] = useState("")
    const [returnDate, setReturnDate] = useState("")

    const handleIssue = () => {
        if (!selectedBook || !studentName.trim()) return

        const newEntry = {
            id: Date.now(),
            bookTitle: selectedBook,
            studentName: studentName.trim(),
            issueDate: new Date().toISOString().split("T")[0],
            returnDate: returnDate || null,
            status: "Issued"
        }

        setIssuedBooks([newEntry, ...issuedBooks])
        setSelectedBook("")
        setStudentName("")
        setReturnDate("")
    }

    const handleReturn = (id) => {
        setIssuedBooks(
            issuedBooks.map(book =>
                book.id === id
                    ? { ...book, status: "Returned", returnDate: book.returnDate || new Date().toISOString().split("T")[0] }
                    : book
            )
        )
    }

    const issuedCount = issuedBooks.filter(b => b.status === "Issued").length
    const returnedCount = issuedBooks.filter(b => b.status === "Returned").length

    return (
        <div>
            <div className="page-header">
                <h2>Issue Book System</h2>
                <p>Issue and manage book transactions</p>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="mini-stat" style={{ background: "var(--light-orange)", borderColor: "var(--primary-orange)" }}>
                    <div className="mini-stat-value" style={{ color: "var(--primary-orange)" }}>{issuedCount}</div>
                    <div className="mini-stat-label">Currently Issued</div>
                </div>
                <div className="mini-stat" style={{ background: "var(--green-50)", borderColor: "var(--green-500)" }}>
                    <div className="mini-stat-value" style={{ color: "var(--green-500)" }}>{returnedCount}</div>
                    <div className="mini-stat-label">Returned</div>
                </div>
                <div className="mini-stat" style={{ background: "var(--gray-50)", borderColor: "var(--gray-300)" }}>
                    <div className="mini-stat-value" style={{ color: "var(--gray-700)" }}>{issuedBooks.length}</div>
                    <div className="mini-stat-label">Total Records</div>
                </div>
            </div>

            {/* Issue Form */}
            <div className="form-card">
                <div className="form-title">📤 Issue a New Book</div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Book Title</label>
                        <select
                            className="form-select"
                            value={selectedBook}
                            onChange={(e) => setSelectedBook(e.target.value)}
                        >
                            <option value="">-- Select a Book --</option>
                            {books.map(book => (
                                <option key={book.id} value={book.title}>
                                    {book.title} — {book.author}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter student name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleIssue()}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Return Date</label>
                        <input
                            type="date"
                            className="form-input"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleIssue}
                        disabled={!selectedBook || !studentName.trim()}
                    >
                        📤 Issue Book
                    </button>
                </div>
            </div>

            {/* Issued Books Table */}
            <div className="table-wrapper">
                <div className="table-header">
                    <h4>📋 Issued Books Record</h4>
                    <span className="badge-count">
                        {issuedBooks.length} record{issuedBooks.length !== 1 ? "s" : ""}
                    </span>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Student Name</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((entry) => (
                            <tr key={entry.id}>
                                <td className="td-primary">{entry.bookTitle}</td>
                                <td>{entry.studentName}</td>
                                <td>{entry.issueDate}</td>
                                <td style={{ color: entry.returnDate ? "var(--green-600)" : "var(--gray-400)" }}>
                                    {entry.returnDate || "—"}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <span className={`badge ${entry.status === "Issued" ? "badge-issued" : "badge-returned"}`}>
                                        {entry.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    {entry.status === "Issued" ? (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleReturn(entry.id)}
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {issuedBooks.length === 0 && (
                            <tr>
                                <td colSpan="6">
                                    <div className="empty-state">
                                        <div className="empty-icon">📤</div>
                                        <p>No issued books yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Issue
