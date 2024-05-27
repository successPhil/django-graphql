import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation ObtainToken($username: String!, $password: String!) {
    obtainToken(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`;
