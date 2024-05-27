import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';

const MovieList = () => {
  const { movies, refetch } = useContext(MovieContext);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <h1>Movie List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', backgroundColor: '#6E7DAB' }}>
            <h2>{movie.Title}</h2>
            <p>Rank: {movie.Rank}</p>
            <p>Year: {movie.Year}</p>
            <p>Length: {movie.Length}</p>
            <p>Rating: {movie.Rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
