import { gql } from "@apollo/client";
export const UPDATE_WORKJOB = gql`
  mutation updateNewJob(
    $id: ID!
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
    $expired_date_hiring: String!
    $province_id: ID!
    $company_id: ID!
    $work_category_id: ID!
  ) {
    updateNewJob(
      input: {
        id: $id
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
        expired_date_hiring: $expired_date_hiring
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
export const UPDATE_STATUS_WORK_JOB = gql`
  mutation updateStatusWorkJob($id: ID!, $status: Int!) {
    updateWorkApply(id: $id, status: $status) {
      status
      message
    }
  }
`;
