
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { LibraryProvider } from "./context/LibraryContext"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  </React.StrictMode>
)