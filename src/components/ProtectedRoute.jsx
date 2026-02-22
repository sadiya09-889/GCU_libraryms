import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth()

    console.log("User:", user)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === "student") {
            return <Navigate to="/profile" />
        }
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute