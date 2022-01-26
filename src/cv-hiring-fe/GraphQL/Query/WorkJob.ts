import { gql } from "@apollo/client";

export const FETCH_WORKJOB_QUERY = gql`
  query WorkJobQuery($slug: String!) {
    getWorkJobBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;
export const FETCH_ALL_JOB_SEARCH = gql`
  query WorkJobQuery($page: Int!) {
    getAllWorkJob(first: 10, page: $page) {
      paginatorInfo {
        total
        perPage
        firstItem
        lastPage
        currentPage
        hasMorePages
        lastItem
      }
      data {
        id
        name
        slug
        is_open
        salary
        expired_date
        work_category {
          name
        }
        company {
          logo
          name
        }
        province {
          name
        }
      }
    }
  }
`;
