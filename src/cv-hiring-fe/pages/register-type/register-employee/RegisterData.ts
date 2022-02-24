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
