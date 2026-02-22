import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [role, setRole] = useState("student")

    const handleLogin = () => {
        login(role)

        if (role === "student") {
            navigate("/profile")
        } else {
            navigate("/")
        }
    }

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            background: "#f8f9fa"
        }}>

            {/* Left — Campus Image */}
            <div style={{
                flex: 1,
                background: "url('/images/image.png') center/cover no-repeat",
                position: "relative",
                display: "flex",
                alignItems: "flex-end"
            }}>
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)"
                }} />
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "40px",
                    color: "white"
                }}>
                    <h1 style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        textShadow: "0 2px 8px rgba(0,0,0,0.3)"
                    }}>
                        Garden City University
                    </h1>
                    <p style={{
                        fontSize: "15px",
                        margin: 0,
                        opacity: 0.9,
                        textShadow: "0 1px 4px rgba(0,0,0,0.3)"
                    }}>
                        Library Management System
                    </p>
                </div>
            </div>

            {/* Right — Login Form */}
            <div style={{
                width: "420px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "48px",
                background: "white",
                boxShadow: "-4px 0 24px rgba(0,0,0,0.06)"
            }}>
                <div style={{ width: "100%", maxWidth: "320px" }}>

                    <div style={{ marginBottom: "36px" }}>
                        <h2 style={{
                            color: "var(--primary-red)",
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "0 0 6px 0"
                        }}>
                            Welcome Back
                        </h2>
                        <p style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            margin: 0
                        }}>
                            Sign in to access the library dashboard
                        </p>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            display: "block",
                            marginBottom: "8px"
                        }}>
                            Select Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-select"
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "8px",
                                border: "1.5px solid #e5e7eb",
                                fontSize: "14px",
                                background: "#f9fafb",
                                outline: "none",
                                cursor: "pointer",
                                transition: "border-color 0.2s, box-shadow 0.2s"
                            }}
                        >
                            <option value="admin">Admin</option>
                            <option value="librarian">Librarian</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <button
                        onClick={handleLogin}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "var(--primary-orange)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background 0.2s, box-shadow 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#ea580c"
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(249, 115, 22, 0.35)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--primary-orange)"
                            e.currentTarget.style.boxShadow = "none"
                        }}
                    >
                        Sign In
                    </button>

                    <p style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginTop: "24px"
                    }}>
                        © 2026 Garden City University
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login