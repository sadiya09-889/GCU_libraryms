import { useState, useEffect } from "react"
import supabase from "../lib/supabase"

function Dashboard() {
    const [books, setBooks] = useState([])
    const [issuedBooks, setIssuedBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data: booksData } = await supabase.from("books").select("*")
            if (booksData) setBooks(booksData)

            const { data: issuedData } = await supabase.from("issued_books").select("*")
            if (issuedData) setIssuedBooks(issuedData)
        }
        fetchData()
    }, [])

    const totalBooks = books.length
    const totalIssued = issuedBooks.filter(b => !b.returned).length
    const totalReturned = issuedBooks.filter(b => b.returned).length

    const cards = [
        {
            label: "Total Books",
            value: totalBooks,
            icon: "📚",
            color: "var(--primary-orange)",
            bg: "var(--light-orange)"
        },
        {
            label: "Books Issued",
            value: totalIssued,
            icon: "📤",
            color: "var(--primary-red)",
            bg: "var(--red-50)"
        },
        {
            label: "Books Returned",
            value: totalReturned,
            icon: "✅",
            color: "var(--green-500)",
            bg: "var(--green-50)"
        },
        {
            label: "Overdue",
            value: 0,
            icon: "⚠️",
            color: "#d97706",
            bg: "#fef3c7"
        }
    ]

    const recentIssued = issuedBooks.slice(0, 5)

    return (
        <div>
            <div className="page-header">
                <h2>Dashboard</h2>
                <p>Overview of your library at a glance</p>
            </div>

            {/* Stats Cards */}
            <div className="stat-cards">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className="stat-card"
                        style={{ borderLeftColor: card.color }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div className="stat-label">{card.label}</div>
                                <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
                            </div>
                            <div className="stat-icon" style={{ background: card.bg }}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="table-wrapper">
                <div className="table-header">
                    <h4>📋 Recent Activity</h4>
                    <span className="badge-count">
                        Last {recentIssued.length} records
                    </span>
                </div>

                {recentIssued.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Student</th>
                                <th>Date</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentIssued.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="td-primary">Book #{entry.book_id}</td>
                                    <td>{entry.student_name}</td>
                                    <td>{entry.due_date}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className={`badge ${!entry.returned ? "badge-issued" : "badge-returned"}`}>
                                            {entry.returned ? "Returned" : "Issued"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <p>No activity yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
