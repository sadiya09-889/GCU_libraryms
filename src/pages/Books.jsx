import { useState, useEffect } from "react"
import supabase from "../lib/supabase"

function Books() {
    const [books, setBooks] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [editingId, setEditingId] = useState(null)

    // 📌 Fetch all books from Supabase on mount
    const fetchBooks = async () => {
        const { data, error } = await supabase.from("books").select("*")
        if (error) {
            console.error("Error fetching books:", error)
        } else {
            setBooks(data)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    // 📌 Add a new book to Supabase
    const addBook = async () => {
        if (!newTitle || !newAuthor) return

        const { error } = await supabase.from("books").insert([
            { title: newTitle, author: newAuthor }
        ])

        if (error) {
            console.error("Error adding book:", error)
        } else {
            setNewTitle("")
            setNewAuthor("")
            fetchBooks() // Re-fetch to get the latest data
        }
    }

    // 📌 Delete a book from Supabase
    const deleteBook = async (id) => {
        const { error } = await supabase.from("books").delete().eq("id", id)

        if (error) {
            console.error("Error deleting book:", error)
        } else {
            fetchBooks()
        }
    }

    const startEdit = (book) => {
        setEditingId(book.id)
        setNewTitle(book.title)
        setNewAuthor(book.author)
    }

    // 📌 Update a book in Supabase
    const updateBook = async () => {
        const { error } = await supabase
            .from("books")
            .update({ title: newTitle, author: newAuthor })
            .eq("id", editingId)

        if (error) {
            console.error("Error updating book:", error)
        } else {
            setEditingId(null)
            setNewTitle("")
            setNewAuthor("")
            fetchBooks()
        }
    }

    return (
        <div>
            <div className="page-header">
                <h2>Books Management</h2>
                <p>Add, edit, and manage your book collection</p>
            </div>

            {/* Form */}
            <div className="form-card">
                <div className="form-title">
                    {editingId ? "✏️ Edit Book" : "📖 Add New Book"}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Book Title</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter book title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter author name"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                        />
                    </div>

                    {editingId ? (
                        <button className="btn btn-secondary" onClick={updateBook}>
                            ✏️ Update
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={addBook}>
                            ➕ Add Book
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <div className="table-header">
                    <h4>📚 Book Collection</h4>
                    <span className="badge-count">{books.length} book{books.length !== 1 ? "s" : ""}</span>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td className="td-primary">{book.title}</td>
                                <td>{book.author}</td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => startEdit(book)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan="3">
                                    <div className="empty-state">
                                        <div className="empty-icon">📚</div>
                                        <p>No books yet. Add your first book above.</p>
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

export default Books