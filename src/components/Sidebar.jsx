import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div
            style={{
                width: "220px",
                background: "var(--primary-red)",
                color: "white",
                minHeight: "100vh",
                padding: "20px"
            }}
        >
            <h2 style={{ color: "var(--primary-orange)" }}>LMS</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>

                <li><Link to="/" style={linkStyle}>Dashboard</Link></li>

                {(user?.role === "admin" || user?.role === "librarian") && (
                    <li><Link to="/books" style={linkStyle}>Books</Link></li>
                )}

                {user?.role === "admin" && (
                    <li><Link to="/users" style={linkStyle}>Users</Link></li>
                )}

                {(user?.role === "admin" || user?.role === "librarian") && (
                    <li><Link to="/issue" style={linkStyle}>Issue</Link></li>
                )}

                <li><Link to="/profile" style={linkStyle}>Profile</Link></li>

            </ul>
        </div>
    )
}

export default Sidebar