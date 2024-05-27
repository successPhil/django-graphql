// src/api/queries.js
import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query GetMovies {
    allMovies {
      id
      Title
      Rank
      Year
      Length
      Rating
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: Int!) {
    movieById(id: $id) {
      id
      Title
      Rank
      Year
      Length
      Rating
    }
  }
`;

export const GET_RANDOM_MOVIE = gql`
  query GetRandomMovie {
    randomMovie {
      id
      Title
      Rank
      Year
      Length
      Rating
    }
  }
`;
