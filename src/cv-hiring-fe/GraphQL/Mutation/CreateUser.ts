import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $role_id: ID!
    $lastname: String!
    $firstname: String!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        role_id: $role_id
        lastname: $lastname
        firstname: $firstname
      }
    ) {
      status
      message
    }
  }
`;
