import { gql } from "@apollo/client";

export const FETCH_USER_IS_APPLIED_WORKJOB = gql`
  query UserAppliedWorkJob($user_id: ID!, $work_job_id: ID!) {
    userAppliedWorkJob(user_id: $user_id, work_job_id: $work_job_id) {
      id
      user_id
      work_job_id
      cv_url
      status
      letter
    }
  }
`;
export const FETCH_WORKJOB_QUERY = gql`
  query WorkJobQuery($slug: String!) {
    getWorkJobBySlug(slug: $slug) {
      id
      name
      slug
      is_open
      salary
      expired_date
      description
      amount_hiring
      requirement_gender
      requirement_exp
      requirement_age
      type
      updated_at
      created_at
      work_category {
        name
      }
      company {
        logo
        name
        slug
        address
        description
        amount_employee
      }
      province {
        name
      }
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
        updated_at
        work_category {
          name
        }
        company {
          logo
          name
          slug
        }
        province {
          name
        }
      }
    }
  }
`;
