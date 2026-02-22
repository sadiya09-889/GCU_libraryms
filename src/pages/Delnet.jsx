import { useState } from "react"

const sampleResources = [
    { id: 1, title: "Machine Learning: A Probabilistic Perspective", type: "Book", source: "IIT Delhi Central Library", link: "#" },
    { id: 2, title: "IEEE Transactions on Neural Networks", type: "Journal", source: "NIT Trichy Library", link: "#" },
    { id: 3, title: "Deep Learning for Natural Language Processing", type: "Thesis", source: "IISC Bangalore Library", link: "#" },
    { id: 4, title: "International Journal of Computer Science", type: "Journal", source: "JNU Central Library", link: "#" },
    { id: 5, title: "Data Mining: Concepts and Techniques", type: "Book", source: "Anna University Library", link: "#" },
    { id: 6, title: "Cloud Computing Security Framework", type: "Research Paper", source: "BITS Pilani Library", link: "#" },
    { id: 7, title: "Advanced Database Systems", type: "Book", source: "IIT Bombay Library", link: "#" },
    { id: 8, title: "Quantum Computing: Theory and Applications", type: "Thesis", source: "IIT Madras Library", link: "#" },
    { id: 9, title: "Journal of Artificial Intelligence Research", type: "Journal", source: "IISc Bangalore Library", link: "#" },
]

const typeIcons = {
    "Book": "📘",
    "Journal": "📰",
    "Thesis": "🎓",
    "Research Paper": "📄"
}

const typeColors = {
    "Book": { bg: "#dbeafe", color: "#2563eb" },
    "Journal": { bg: "#fef3c7", color: "#d97706" },
    "Thesis": { bg: "#ede9fe", color: "#7c3aed" },
    "Research Paper": { bg: "#d1fae5", color: "#059669" }
}

function Delnet() {
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("")
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    const handleSearch = () => {
        let filtered = [...sampleResources]
        if (typeFilter) filtered = filtered.filter(r => r.type === typeFilter)
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.source.toLowerCase().includes(q)
            )
        }
        setResults(filtered)
        setSearched(true)
    }

    const handleReset = () => {
        setSearchQuery("")
        setTypeFilter("")
        setResults([])
        setSearched(false)
    }

    const styles = {
        page: {
            maxWidth: "1100px",
            margin: "0 auto",
            fontFamily: "'Segoe UI', sans-serif"
        },
        hero: {
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)",
            borderRadius: "16px",
            padding: "40px 36px",
            color: "white",
            marginBottom: "28px",
            position: "relative",
            overflow: "hidden"
        },
        heroPattern: {
            position: "absolute",
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
            pointerEvents: "none"
        },
        heroTitle: {
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0",
            position: "relative"
        },
        heroSub: {
            fontSize: "15px",
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            position: "relative",
            maxWidth: "600px",
            lineHeight: "1.6"
        },
        searchCard: {
            background: "white",
            borderRadius: "12px",
            padding: "24px 28px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            marginBottom: "28px"
        },
        searchRow: {
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
        input: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            fontSize: "14px",
            background: "#f9fafb",
            color: "#1a1a2e",
            outline: "none",
            transition: "border-color 0.2s"
        },
        select: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            fontSize: "14px",
            background: "#f9fafb",
            color: "#1a1a2e",
            outline: "none",
            cursor: "pointer"
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
            background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(30,58,95,0.3)",
            transition: "transform 0.15s"
        },
        btnReset: {
            padding: "10px 28px",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            background: "white",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
        },
        resultsHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
            marginBottom: "36px"
        },
        card: {
            background: "white",
            borderRadius: "12px",
            padding: "22px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        },
        cardTop: {
            display: "flex",
            alignItems: "flex-start",
            gap: "14px"
        },
        iconCircle: {
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            flexShrink: 0
        },
        cardTitle: {
            fontSize: "15px",
            fontWeight: "600",
            color: "#1a1a2e",
            margin: 0,
            lineHeight: "1.4"
        },
        typeBadge: {
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600"
        },
        sourceText: {
            fontSize: "13px",
            color: "#6b7280",
            margin: 0
        },
        accessBtn: {
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            alignSelf: "flex-start",
            transition: "transform 0.15s"
        },
        infoSection: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "8px"
        },
        infoCard: {
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6"
        },
        infoTitle: {
            fontSize: "17px",
            fontWeight: "600",
            color: "#1a1a2e",
            margin: "0 0 12px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        },
        infoText: {
            fontSize: "14px",
            color: "#6b7280",
            lineHeight: "1.7",
            margin: 0
        },
        listItem: {
            padding: "6px 0",
            fontSize: "14px",
            color: "#4b5563",
            borderBottom: "1px solid #f9fafb"
        },
        emptyState: {
            textAlign: "center",
            padding: "60px 20px",
            color: "#9ca3af"
        }
    }

    return (
        <div style={styles.page}>

            {/* Hero */}
            <div style={styles.hero}>
                <div style={styles.heroPattern} />
                <h2 style={styles.heroTitle}>🌐 DELNET – Digital Library Network</h2>
                <p style={styles.heroSub}>
                    Access thousands of books, journals, and research papers from libraries
                    across India through the Developing Library Network.
                </p>
            </div>

            {/* Search */}
            <div style={styles.searchCard}>
                <div style={styles.searchRow}>
                    <div style={{ ...styles.filterGroup, flex: "2 1 300px" }}>
                        <label style={styles.label}>Search Resources</label>
                        <input
                            type="text"
                            placeholder="Search books, journals, research papers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.input}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>
                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Resource Type</label>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">All Types</option>
                            <option value="Book">📘 Books</option>
                            <option value="Journal">📰 Journals</option>
                            <option value="Thesis">🎓 Thesis</option>
                            <option value="Research Paper">📄 Research Papers</option>
                        </select>
                    </div>
                </div>
                <div style={styles.btnRow}>
                    <button onClick={handleSearch} style={styles.btnSearch}>🔍 Search DELNET</button>
                    <button onClick={handleReset} style={styles.btnReset}>↻ Reset</button>
                </div>
            </div>

            {/* Results */}
            {searched && (
                <div>
                    <div style={styles.resultsHeader}>
                        <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a2e", margin: 0 }}>
                            Search Results
                        </h3>
                        <span style={{
                            background: "#dbeafe", color: "#2563eb",
                            padding: "4px 12px", borderRadius: "20px",
                            fontSize: "13px", fontWeight: "600"
                        }}>
                            {results.length} resource{results.length !== 1 ? "s" : ""} found
                        </span>
                    </div>

                    {results.length > 0 ? (
                        <div style={styles.grid}>
                            {results.map(resource => {
                                const tc = typeColors[resource.type] || { bg: "#f3f4f6", color: "#4b5563" }
                                return (
                                    <div
                                        key={resource.id}
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
                                        <div style={styles.cardTop}>
                                            <div style={{ ...styles.iconCircle, background: tc.bg }}>
                                                {typeIcons[resource.type]}
                                            </div>
                                            <div>
                                                <h4 style={styles.cardTitle}>{resource.title}</h4>
                                                <span style={{
                                                    ...styles.typeBadge,
                                                    background: tc.bg,
                                                    color: tc.color,
                                                    marginTop: "6px",
                                                    display: "inline-block"
                                                }}>
                                                    {resource.type}
                                                </span>
                                            </div>
                                        </div>
                                        <p style={styles.sourceText}>📍 {resource.source}</p>
                                        <button style={styles.accessBtn}>
                                            Access Resource →
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
                            <h3 style={{ color: "#6b7280", margin: "0 0 8px 0" }}>No Resources Found</h3>
                            <p>Try adjusting your search query or filters.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Info Section */}
            <div style={styles.infoSection}>
                <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>📖 What is DELNET?</h4>
                    <p style={styles.infoText}>
                        DELNET (Developing Library Network) is a major library network in India
                        that promotes resource sharing among libraries through inter-library loan
                        services, union catalogues, and database access. Established in 1988,
                        it connects over 6,800 libraries across India.
                    </p>
                </div>

                <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>✨ Benefits for Students</h4>
                    <div>
                        {[
                            "Access books and journals from 6,800+ libraries",
                            "Free inter-library loan service for enrolled students",
                            "Search union catalogues of millions of records",
                            "Access to e-journals and digital resources",
                            "Request photocopies of journal articles"
                        ].map((item, i) => (
                            <div key={i} style={styles.listItem}>✓ {item}</div>
                        ))}
                    </div>
                </div>

                <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>🔑 How to Access</h4>
                    <div>
                        {[
                            "1. Visit the university library help desk",
                            "2. Register with your student ID",
                            "3. Get DELNET login credentials",
                            "4. Search the DELNET catalogue online",
                            "5. Place inter-library requests through the librarian"
                        ].map((item, i) => (
                            <div key={i} style={styles.listItem}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Delnet
