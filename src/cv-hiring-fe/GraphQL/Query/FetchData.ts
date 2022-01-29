import { gql } from "@apollo/client";

export const FETCH_USER_LOGIN = gql`
  query FetchUserLogin {
    me {
      id
      email
    }
  }
`;

export const FETCH_HOME_PAGE = gql`
  query FetchHomePage {
    provinces {
      id
      name
    }
    workCategories {
      id
      name
    }
    newWorkJob(amount: 16) {
      id
      name
      slug
      salary
      type
      expired_date
      province {
        name
      }
      company {
        slug
        name
      }
      updated_at
    }
    topCompany(amount: 6) {
      id
      name
      slug
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
`;
