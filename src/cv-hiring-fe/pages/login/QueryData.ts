import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
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
