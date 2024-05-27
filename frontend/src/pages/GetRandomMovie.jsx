// src/pages/GetRandomMovie.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_MOVIE } from '../api/queries';

const GetRandomMovie = () => {
  const { loading, data, error, refetch } = useQuery(GET_RANDOM_MOVIE);

  return (
    <div>
      <h1>Get Random Movie</h1>
      <button onClick={() => refetch()}>Get Random Movie</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', backgroundColor: '#6E7DAB' }}>
          <h2>{data.randomMovie.Title}</h2>
          <p>Rank: {data.randomMovie.Rank}</p>
          <p>Year: {data.randomMovie.Year}</p>
          <p>Length: {data.randomMovie.Length}</p>
          <p>Rating: {data.randomMovie.Rating}</p>
        </div>
      )}
    </div>
  );
}

export default GetRandomMovie;
