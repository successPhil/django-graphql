import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MOVIE } from '../api/mutations';
import { MovieContext } from '../context/MovieContext';

const CreateMovie = () => {
  const [Title, setTitle] = useState('');
  const [Year, setYear] = useState('');
  const [Rank, setRank] = useState('');
  const [Length, setLength] = useState('');
  const [Rating, setRating] = useState('');
  const { updateMovies, refetch } = useContext(MovieContext);
  const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE, {
    onCompleted: (data) => {
      updateMovies(data.createMovie.movie);
      refetch();
      alert('Movie created successfully!');
      setTitle('');
      setYear('');
      setRank('');
      setLength('');
      setRating('');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovie({ variables: { Title, Year: parseInt(Year), Rank: parseInt(Rank), Length, Rating } });
  }

  return (
    <div>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={Year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Rank:</label>
          <input type="number" value={Rank} onChange={(e) => setRank(e.target.value)} required />
        </div>
        <div>
          <label>Length:</label>
          <input type="text" value={Length} onChange={(e) => setLength(e.target.value)} required />
        </div>
        <div>
          <label>Rating:</label>
          <input type="text" value={Rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <button type="submit">Create Movie</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default CreateMovie;
