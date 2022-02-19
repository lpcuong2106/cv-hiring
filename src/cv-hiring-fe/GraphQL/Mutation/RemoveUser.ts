import { gql } from "@apollo/client";
export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      status
      message
    }
  }
`;
