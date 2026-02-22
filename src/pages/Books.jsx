import { useState, useEffect } from "react"
import { useLibrary } from "../context/LibraryContext"
import { supabase } from "../lib/supabase"

function Books() {

    useEffect(() => {
        const testConnection = async () => {
            const { data, error } = await supabase.from("books").select("*")
            console.log("Books from DB:", data)
            console.log("Error:", error)
        }

        testConnection()
    }, [])

    const { books, setBooks } = useLibrary()

    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [editingId, setEditingId] = useState(null)

    const addBook = () => {
        if (!newTitle || !newAuthor) return

        const newBook = {
            id: Date.now(),
            title: newTitle,
            author: newAuthor
        }

        setBooks([...books, newBook])
        setNewTitle("")
        setNewAuthor("")
    }

    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id))
    }

    const startEdit = (book) => {
        setEditingId(book.id)
        setNewTitle(book.title)
        setNewAuthor(book.author)
    }

    const updateBook = () => {
        setBooks(
            books.map(book =>
                book.id === editingId
                    ? { ...book, title: newTitle, author: newAuthor }
                    : book
            )
        )

        setEditingId(null)
        setNewTitle("")
        setNewAuthor("")
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