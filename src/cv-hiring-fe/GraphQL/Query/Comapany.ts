import { gql } from "@apollo/client";

export const FETCH_COMPANY_DETAIL = gql`
  query CompanyQuery($slug: String!) {
    companyDetail(slug: $slug) {
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
      work_jobs {
        id
        name
        slug
        salary
        expired_date
        updated_at
        province {
          name
        }
      }
    }
  }
`;
