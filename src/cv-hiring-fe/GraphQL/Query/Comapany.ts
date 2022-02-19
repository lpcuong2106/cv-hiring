import { gql } from "@apollo/client";

export const FETCH_COMPANY_DETAIL = gql`
  query CompanyQuery($slug: String, $id: ID) {
    companyDetail(slug: $slug, id: $id) {
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
      user {
        id
      }
    }
  }
`;

export const FETCH_ALL_COMPANY_MANAGE = gql`
  query getAllCompany($page: Int) {
    getAllCompany(page: $page) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        slug
        name
        logo
        banner
        amount_job_hiring
      }
    }
  }
`;
