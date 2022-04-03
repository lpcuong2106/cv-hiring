import { gql } from "@apollo/client";

export const FETCH_COMPANY_DETAIL = gql`
  query CompanyQuery($slug: String, $id: ID, $page: Int) {
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
      avgReview
      user {
        id
      }
    }
    companyReview(slug: $slug, page: $page) {
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
        title
        rating
        review
        author {
          email
          avatar
        }
        created_at
      }
    }
  }
`;

export const FETCH_ALL_COMPANY_MANAGE = gql`
  query getAllCompany($page: Int, $name: String) {
    getAllCompany(page: $page, name: $name) {
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
