import { gql } from "@apollo/client";

export const FETCH_USER_LOGIN = gql`
  query FetchUserLogin {
    me {
      id
      email
    }
  }
`;
