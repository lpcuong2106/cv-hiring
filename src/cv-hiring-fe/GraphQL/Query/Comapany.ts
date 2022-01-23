import { gql } from "@apollo/client";

export const FETCH_COMPANY_DETAIL = gql`
  query CompanyQuery($id: ID!) {
    companyDetail(id: $id) {
      id
      name
      slug
      description
      website
      amount_job_hiring
      amount_employee
      banner
      logo
      fanpage
      address
      gg_map
    }
  }
`;
