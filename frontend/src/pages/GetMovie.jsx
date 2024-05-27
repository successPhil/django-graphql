import React, { useState, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MOVIE_BY_ID } from '../api/queries';
import { MovieContext } from '../context/MovieContext';

const GetMovie = () => {
  const [movieId, setMovieId] = useState('');
  const [getMovie, { loading, data, error }] = useLazyQuery(GET_MOVIE_BY_ID);
  const { movies } = useContext(MovieContext);

  const handleSelectChange = (e) => {
    setMovieId(e.target.value);
    getMovie({ variables: { id: parseInt(e.target.value) } });
  };

  return (
    <div>
      <h1>Get Movie</h1>
      <select value={movieId} onChange={handleSelectChange}>
        <option value="">Select a Movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>{movie.Title}</option>
        ))}
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', backgroundColor: '#6E7DAB' }}>
          <h2>{data.movieById.Title}</h2>
          <p>Rank: {data.movieById.Rank}</p>
          <p>Year: {data.movieById.Year}</p>
          <p>Length: {data.movieById.Length}</p>
          <p>Rating: {data.movieById.Rating}</p>
        </div>
      )}
    </div>
  );
}

export default GetMovie;
