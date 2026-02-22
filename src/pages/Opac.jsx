import { useState } from "react"

const departmentSubjects = {
    "Computer Science": ["Data Structures", "Artificial Intelligence", "Machine Learning", "DBMS"],
    "Electronics & Communication": ["Digital Electronics", "Signal Processing", "VLSI Design", "Embedded Systems"],
    "Mechanical Engineering": ["Thermodynamics", "Fluid Mechanics", "Manufacturing", "CAD/CAM"],
    "Civil Engineering": ["Structural Analysis", "Surveying", "Geotechnical Engineering", "Transportation"],
    "MBA": ["Marketing", "Finance", "Human Resources", "Business Analytics"],
    "Mathematics": ["Linear Algebra", "Calculus", "Probability & Statistics", "Discrete Mathematics"]
}

const sampleBooks = [
    { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", department: "Computer Science", subject: "Data Structures", status: "Available" },
    { id: 2, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", department: "Computer Science", subject: "Artificial Intelligence", status: "Issued" },
    { id: 3, title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", department: "Computer Science", subject: "Machine Learning", status: "Available" },
    { id: 4, title: "Database System Concepts", author: "Abraham Silberschatz", department: "Computer Science", subject: "DBMS", status: "Available" },
    { id: 5, title: "Digital Design", author: "M. Morris Mano", department: "Electronics & Communication", subject: "Digital Electronics", status: "Issued" },
    { id: 6, title: "Signals and Systems", author: "Alan V. Oppenheim", department: "Electronics & Communication", subject: "Signal Processing", status: "Available" },
    { id: 7, title: "Engineering Thermodynamics", author: "P.K. Nag", department: "Mechanical Engineering", subject: "Thermodynamics", status: "Available" },
    { id: 8, title: "Fluid Mechanics", author: "Frank M. White", department: "Mechanical Engineering", subject: "Fluid Mechanics", status: "Issued" },
    { id: 9, title: "Structural Analysis", author: "R.C. Hibbeler", department: "Civil Engineering", subject: "Structural Analysis", status: "Available" },
    { id: 10, title: "Principles of Marketing", author: "Philip Kotler", department: "MBA", subject: "Marketing", status: "Available" },
    { id: 11, title: "Financial Management", author: "I.M. Pandey", department: "MBA", subject: "Finance", status: "Issued" },
    { id: 12, title: "Linear Algebra and Its Applications", author: "Gilbert Strang", department: "Mathematics", subject: "Linear Algebra", status: "Available" },
    { id: 13, title: "Probability and Statistics", author: "Jay L. Devore", department: "Mathematics", subject: "Probability & Statistics", status: "Available" },
    { id: 14, title: "Manufacturing Engineering", author: "Kalpakjian", department: "Mechanical Engineering", subject: "Manufacturing", status: "Available" },
    { id: 15, title: "VLSI Design", author: "Wayne Wolf", department: "Electronics & Communication", subject: "VLSI Design", status: "Available" },
]

function Opac() {
    const [department, setDepartment] = useState("")
    const [subject, setSubject] = useState("")
    const [keyword, setKeyword] = useState("")
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    const subjects = department ? departmentSubjects[department] || [] : []

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
        setSubject("")
    }

    const handleSearch = () => {
        let filtered = [...sampleBooks]
        if (department) filtered = filtered.filter(b => b.department === department)
        if (subject) filtered = filtered.filter(b => b.subject === subject)
        if (keyword.trim()) {
            const kw = keyword.toLowerCase()
            filtered = filtered.filter(b =>
                b.title.toLowerCase().includes(kw) ||
                b.author.toLowerCase().includes(kw)
            )
        }
        setResults(filtered)
        setSearched(true)
        setSelectedBook(null)
    }

    const handleReset = () => {
        setDepartment("")
        setSubject("")
        setKeyword("")
        setResults([])
        setSearched(false)
        setSelectedBook(null)
    }

    const styles = {
        page: {
            maxWidth: "1100px",
            margin: "0 auto",
            fontFamily: "'Segoe UI', sans-serif"
        },
        header: {
            textAlign: "left",
            marginBottom: "24px"
        },
        headerTitle: {
            fontSize: "28px",
            fontWeight: "700",
            color: "#1a1a2e",
            margin: "0 0 6px 0"
        },
        headerSub: {
            color: "#6b7280",
            fontSize: "15px",
            margin: 0
        },
        filterCard: {
            background: "white",
            borderRadius: "12px",
            padding: "24px 28px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            marginBottom: "28px"
        },
        filterRow: {
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "flex-end"
        },
        filterGroup: {
            display: "flex",
            flexDirection: "column",
            flex: "1 1 200px"
        },
        label: {
            fontSize: "12px",
            fontWeight: "600",
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "6px"
        },
        select: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            fontSize: "14px",
            background: "#f9fafb",
            color: "#1a1a2e",
            outline: "none",
            cursor: "pointer",
            transition: "border-color 0.2s"
        },
        searchInput: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            fontSize: "14px",
            background: "#f9fafb",
            color: "#1a1a2e",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            transition: "border-color 0.2s"
        },
        btnRow: {
            display: "flex",
            gap: "10px",
            marginTop: "16px"
        },
        btnSearch: {
            padding: "10px 28px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(99,102,241,0.3)"
        },
        btnReset: {
            padding: "10px 28px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            background: "white",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s"
        },
        resultsHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px"
        },
        resultsTitle: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#1a1a2e",
            margin: 0
        },
        badge: {
            background: "#ede9fe",
            color: "#6366f1",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px"
        },
        card: {
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
        },
        cardTitle: {
            fontSize: "16px",
            fontWeight: "600",
            color: "#1a1a2e",
            margin: "0 0 8px 0"
        },
        cardAuthor: {
            fontSize: "14px",
            color: "#6b7280",
            margin: "0 0 12px 0"
        },
        tagRow: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "14px"
        },
        tag: {
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            background: "#f3f4f6",
            color: "#4b5563"
        },
        statusAvailable: {
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            background: "#d1fae5",
            color: "#059669"
        },
        statusIssued: {
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            background: "#fee2e2",
            color: "#dc2626"
        },
        detailsBtn: {
            marginTop: "12px",
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "transform 0.15s"
        },

        modal: {
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        },
        modalContent: {
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "480px",
            width: "90%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
        },
        modalClose: {
            marginTop: "20px",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#f3f4f6",
            color: "#4b5563",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
        }
    }

    return (
        <div style={styles.page}>

            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.headerTitle}>📚 Library OPAC – Search Books</h2>
                <p style={styles.headerSub}>Online Public Access Catalog · Garden City University</p>
            </div>

            {/* Filters */}
            <div style={styles.filterCard}>
                <div style={styles.filterRow}>
                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Department</label>
                        <select
                            value={department}
                            onChange={handleDepartmentChange}
                            style={styles.select}
                        >
                            <option value="">All Departments</option>
                            {Object.keys(departmentSubjects).map(dep => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            style={{
                                ...styles.select,
                                opacity: department ? 1 : 0.5
                            }}
                            disabled={!department}
                        >
                            <option value="">All Subjects</option>
                            {subjects.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Keyword Search</label>
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            style={styles.searchInput}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>
                </div>

                <div style={styles.btnRow}>
                    <button onClick={handleSearch} style={styles.btnSearch}>
                        🔍 Search
                    </button>
                    <button onClick={handleReset} style={styles.btnReset}>
                        ↻ Reset
                    </button>
                </div>
            </div>

            {/* Results */}
            {searched && (
                <div>
                    <div style={styles.resultsHeader}>
                        <h3 style={styles.resultsTitle}>Search Results</h3>
                        <span style={styles.badge}>{results.length} book{results.length !== 1 ? "s" : ""} found</span>
                    </div>

                    <div style={styles.grid}>
                        {results.map(book => (
                            <div
                                key={book.id}
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)"
                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)"
                                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"
                                }}
                            >
                                <h4 style={styles.cardTitle}>{book.title}</h4>
                                <p style={styles.cardAuthor}>by {book.author}</p>
                                <div style={styles.tagRow}>
                                    <span style={styles.tag}>{book.department}</span>
                                    <span style={styles.tag}>{book.subject}</span>
                                </div>
                                <span style={book.status === "Available" ? styles.statusAvailable : styles.statusIssued}>
                                    {book.status === "Available" ? "✓ " : "✕ "}{book.status}
                                </span>
                                <br />
                                <button
                                    onClick={() => setSelectedBook(book)}
                                    style={styles.detailsBtn}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {selectedBook && (
                <div style={styles.modal} onClick={() => setSelectedBook(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ margin: "0 0 6px 0", color: "#1a1a2e", fontSize: "20px" }}>
                            {selectedBook.title}
                        </h3>
                        <p style={{ color: "#6b7280", margin: "0 0 20px 0" }}>by {selectedBook.author}</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                                <span style={{ color: "#6b7280", fontWeight: "500" }}>Department</span>
                                <span style={{ fontWeight: "600", color: "#1a1a2e" }}>{selectedBook.department}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                                <span style={{ color: "#6b7280", fontWeight: "500" }}>Subject</span>
                                <span style={{ fontWeight: "600", color: "#1a1a2e" }}>{selectedBook.subject}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                                <span style={{ color: "#6b7280", fontWeight: "500" }}>Status</span>
                                <span style={selectedBook.status === "Available" ? styles.statusAvailable : styles.statusIssued}>
                                    {selectedBook.status}
                                </span>
                            </div>
                        </div>

                        <button onClick={() => setSelectedBook(null)} style={styles.modalClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Opac
