import { gql } from "@apollo/client";
export const CREATE_CATEGORY = gql`
  mutation createWorkCategory($name: String!) {
    createWorkCategory(name: $name) {
      status
      message
    }
  }
`;
