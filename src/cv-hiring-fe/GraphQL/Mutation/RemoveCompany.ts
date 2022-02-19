import { gql } from "@apollo/client";
export const REMOVE_COMPANY = gql`
  mutation removeCompany($id: ID!) {
    removeCompany(id: $id) {
      status
      message
    }
  }
`;
