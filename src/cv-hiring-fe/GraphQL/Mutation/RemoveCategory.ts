import { gql } from "@apollo/client";
export const REMOVE_WORKCATEGORY = gql`
  mutation removeCategory($id: ID!) {
    removeCategory(id: $id) {
      status
      message
    }
  }
`;
