// src/api/mutations.js
import { gql } from '@apollo/client';

export const CREATE_MOVIE = gql`
  mutation CreateMovie($Title: String!, $Year: Int!, $Rank: Int!, $Length: String!, $Rating: String!) {
    createMovie(Title: $Title, Year: $Year, Rank: $Rank, Length: $Length, Rating: $Rating) {
      movie {
        id
        Title
        Rank
        Year
        Length
        Rating
      }
    }
  }
`;
