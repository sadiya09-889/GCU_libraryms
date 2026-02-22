import { createContext, useContext, useState } from "react"

const LibraryContext = createContext()

export function LibraryProvider({ children }) {
    const [books, setBooks] = useState([
        { id: 1, title: "React Basics", author: "Dan Abramov" },
        { id: 2, title: "Node.js Guide", author: "Ryan Dahl" }
    ])

    const [issuedBooks, setIssuedBooks] = useState([
        { id: 1, bookTitle: "React Basics", studentName: "Rahul Sharma", issueDate: "2026-02-20", returnDate: null, status: "Issued" },
        { id: 2, bookTitle: "Node.js Guide", studentName: "Priya Nair", issueDate: "2026-02-18", returnDate: "2026-02-21", status: "Returned" }
    ])

    return (
        <LibraryContext.Provider value={{ books, setBooks, issuedBooks, setIssuedBooks }}>
            {children}
        </LibraryContext.Provider>
    )
}

export function useLibrary() {
    return useContext(LibraryContext)
}
