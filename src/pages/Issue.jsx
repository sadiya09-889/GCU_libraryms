import { useEffect, useState } from "react"
import supabase from "../lib/supabase"

function Issue() {
    const [books, setBooks] = useState([])
    const [issuedBooks, setIssuedBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState("")
    const [studentName, setStudentName] = useState("")

    // 📌 Fetch books for dropdown
    const fetchBooks = async () => {
        const { data, error } = await supabase.from("books").select("*")
        if (!error) setBooks(data)
    }

    // 📌 Fetch issued books
    const fetchIssuedBooks = async () => {
        const { data, error } = await supabase
            .from("issued_books")
            .select("*")

        if (!error) setIssuedBooks(data)
    }

    useEffect(() => {
        fetchBooks()
        fetchIssuedBooks()
    }, [])

    // 📌 Issue book
    const issueBook = async () => {
        if (!selectedBookId || !studentName) return

        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 7)

        const { error } = await supabase.from("issued_books").insert([
            {
                book_id: selectedBookId,
                student_name: studentName,
                due_date: dueDate
            }
        ])

        if (!error) {
            setStudentName("")
            setSelectedBookId("")
            fetchIssuedBooks()
        }
    }

    // 📌 Return book + fine calculation
    const returnBook = async (issue) => {
        const today = new Date()
        const due = new Date(issue.due_date)

        let fine = 0

        if (today > due) {
            const diffTime = today - due
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            fine = diffDays * 10 // ₹10 per day
        }

        await supabase
            .from("issued_books")
            .update({ returned: true, fine: fine })
            .eq("id", issue.id)

        fetchIssuedBooks()
    }

    return (
        <div>
            <h2 style={{ color: "var(--primary-red)" }}>Issue Book System</h2>

            {/* Issue Form */}
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px"
                }}
            >
                <select
                    value={selectedBookId}
                    onChange={(e) => setSelectedBookId(e.target.value)}
                    style={{ marginRight: "10px", padding: "6px" }}
                >
                    <option value="">Select Book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    style={{ marginRight: "10px", padding: "6px" }}
                />

                <button
                    onClick={issueBook}
                    style={{
                        background: "var(--primary-red)",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer"
                    }}
                >
                    Issue Book
                </button>
            </div>

            {/* Issued Books Table */}
            <table
                style={{
                    width: "100%",
                    background: "white",
                    borderCollapse: "collapse"
                }}
            >
                <thead
                    style={{
                        background: "var(--primary-orange)",
                        color: "white"
                    }}
                >
                    <tr>
                        <th>Book ID</th>
                        <th>Student</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Fine</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {issuedBooks.map((issue) => (
                        <tr key={issue.id}>
                            <td>{issue.book_id}</td>
                            <td>{issue.student_name}</td>
                            <td>{issue.due_date}</td>
                            <td>
                                {issue.returned ? (
                                    <span style={{ color: "green" }}>Returned</span>
                                ) : (
                                    <span style={{ color: "red" }}>Issued</span>
                                )}
                            </td>
                            <td>₹{issue.fine}</td>
                            <td>
                                {!issue.returned && (
                                    <button
                                        onClick={() => returnBook(issue)}
                                        style={{
                                            background: "var(--primary-orange)",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Return
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Issue