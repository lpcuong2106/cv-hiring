import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation updateWorkCategory($name: String!, $id: ID!) {
    updateWorkCategory(name: $name, id: $id) {
      status
      message
    }
  }
`;
