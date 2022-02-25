import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    registerUser(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    ) {
      message
      token
      user {
        id
        email
        lastname
        firstname
        avatar
        role {
          id
          name
        }
        company {
          id
          name
          description
          amount_employee
          website
          fanpage
          address
          gg_map
          logo
          banner
          amount_job_hiring
        }
      }
    }
  }
`;

export const REGISTER_USER_HR = gql`
  mutation registerUserHr(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $name: String!
    $address: String!
    $amount_employee: String!
  ) {
    registerUserHr(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
      name: $name
      address: $address
      amount_employee: $amount_employee
    ) {
      message
      token
      user {
        id
        email
        lastname
        firstname
        avatar
        role {
          id
          name
        }
        company {
          id
          name
          description
          amount_employee
          website
          fanpage
          address
          gg_map
          logo
          banner
          amount_job_hiring
        }
      }
    }
  }
`;
