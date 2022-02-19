import { gql } from "@apollo/client";

export const FETCH_ALL_USER = gql`
  query users {
    users {
      id
      email
      lastname
      firstname
      avatar
      role {
        id
        name
      }
    }
  }
`;
