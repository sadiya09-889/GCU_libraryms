import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Books from "./pages/Books"
import Opac from "./pages/Opac"
import Delnet from "./pages/Delnet"
import Issue from "./pages/Issue"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="books"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian"]}>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <h1>Users Page</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="issue"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian"]}>
              <Issue />
            </ProtectedRoute>
          }
        />

        <Route
          path="opac"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian", "student"]}>
              <Opac />
            </ProtectedRoute>
          }
        />

        <Route
          path="delnet"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian", "student"]}>
              <Delnet />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "librarian", "student"]}>
              <h1>Profile Page</h1>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App