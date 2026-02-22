import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function MainLayout() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path)
    }

    const navItems = [
        { to: "/", label: "Dashboard", icon: "📊", show: true },
        { to: "/books", label: "Books", icon: "📚", show: user?.role === "admin" || user?.role === "librarian" },
        { to: "/issue", label: "Issue Book", icon: "📤", show: user?.role === "admin" || user?.role === "librarian" },
        { to: "/users", label: "Users", icon: "👥", show: user?.role === "admin" },
    ]

    const resourceItems = [
        { to: "/opac", label: "OPAC", icon: "🔍" },
        { to: "/delnet", label: "DELNET", icon: "🌐" },
        { to: "/profile", label: "Profile", icon: "👤" },
    ]

    return (
        <div className="layout">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <h3>📖 GCU Library</h3>
                    <span>Management System</span>
                </div>

                <ul className="sidebar-nav">
                    <li className="sidebar-section">Main</li>
                    {navItems.filter(item => item.show).map(item => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`sidebar-link ${isActive(item.to) ? "active" : ""}`}
                            >
                                <span className="icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}

                    <li className="sidebar-section">Resources</li>
                    {resourceItems.map(item => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`sidebar-link ${isActive(item.to) ? "active" : ""}`}
                            >
                                <span className="icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Area */}
            <div className="main-area">

                {/* Navbar */}
                <header className="navbar">
                    <span className="navbar-title">Garden City University — Library Management System</span>
                    <div className="navbar-right">
                        <span className="navbar-role">{user?.role || "User"}</span>
                        <button className="btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout