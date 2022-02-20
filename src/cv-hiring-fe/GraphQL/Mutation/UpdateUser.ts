import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $password: String, $role_id: ID!) {
    updateUser(input: { id: $id, password: $password, role_id: $role_id }) {
      status
      message
    }
  }
`;
