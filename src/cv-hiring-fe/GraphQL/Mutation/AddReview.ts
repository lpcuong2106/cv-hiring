import { gql } from "@apollo/client";
export const ADD_REVIEW_COMPANY = gql`
  mutation addReviewCompany(
    $companyId: ID!
    $userId: ID!
    $review: String!
    $rating: Int!
  ) {
    addReviewCompany(
      companyId: $companyId
      userId: $userId
      review: $review
      rating: $rating
    ) {
      status
      message
    }
  }
`;
