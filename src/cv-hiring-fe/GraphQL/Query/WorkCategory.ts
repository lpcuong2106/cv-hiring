import { gql } from "@apollo/client";

export const FETCH_CATEGORY_DETAIL = gql`
  query workCategoryDetail($id: ID!) {
    categoryDetail(id: $id) {
      id
      name
    }
  }
`;
