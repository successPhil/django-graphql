import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/SignIn"
import MoviesList from "./pages/MoviesList"
function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
   <Router>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/movies" element={isAuthenticated ? <MoviesList /> : <Navigate to="/" />} />
    </Routes>
   </Router>
    </>
  )
}

export default App
