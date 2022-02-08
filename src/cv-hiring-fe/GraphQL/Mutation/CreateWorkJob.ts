import { gql } from "@apollo/client";
export const CREATE_WORKJOB = gql`
  mutation createNewJob(
    $name: String!
    $description: String!
    $benefit: String!
    $requirement: String!
    $requirement_exp: String!
    $requirement_gender: String!
    $requirement_age: String!
    $amount_hiring: Int!
    $address_work: String!
    $salary: String!
    $type: String!
    $expired_date: String!
    $province_id: ID!
    $company_id: ID!
    $work_category_id: ID!
  ) {
    createNewJob(
      input: {
        name: $name
        description: $description
        benefit: $benefit
        requirement: $requirement
        requirement_exp: $requirement_exp
        requirement_gender: $requirement_gender
        requirement_age: $requirement_age
        amount_hiring: $amount_hiring
        address_work: $address_work
        salary: $salary
        type: $type
        expired_date: $expired_date
        province_id: $province_id
        company_id: $company_id
        work_category_id: $work_category_id
      }
    ) {
      status
      message
    }
  }
`;
