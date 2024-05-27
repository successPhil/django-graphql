import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieList from './pages/MovieList';
import CreateMovie from './pages/CreateMovie';
import GetMovie from './pages/GetMovie';
import GetRandomMovie from './pages/GetRandomMovie';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Movie</Link></li>
          <li><Link to="/get-movie">Get Movie</Link></li>
          <li><Link to="/random-movie">Get Random Movie</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/create" element={<CreateMovie />} />
        <Route path="/get-movie" element={<GetMovie />} />
        <Route path="/random-movie" element={<GetRandomMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
