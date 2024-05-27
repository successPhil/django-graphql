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