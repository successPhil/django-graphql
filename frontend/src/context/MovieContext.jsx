import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../api/queries';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);

  useEffect(() => {
    if (data) {
      setMovies(data.allMovies);
    }
  }, [data]);

  const updateMovies = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, updateMovies, refetch }}>
      {children}
    </MovieContext.Provider>
  );
};
