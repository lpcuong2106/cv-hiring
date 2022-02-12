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
  query WorkJobQuery(
    $page: Int!
    $name: String
    $categoryId: ID
    $provinceId: ID
  ) {
    getAllWorkJob(
      page: $page
      input: { name: $name, provinceId: $provinceId, categoryId: $categoryId }
    ) {
      paginatorInfo {
        total
        perPage
        firstItem
        lastPage
        currentPage
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
export const FETCH_WORK_JOB_HIRING_COMPANY = gql`
  query workJobHiringOfCompany($companyId: ID!) {
    workJobHiringOfCompany(companyId: $companyId) {
      id
      name
      slug
      updated_at
      expired_date
      work_category {
        name
      }
      province {
        name
      }
    }
  }
`;
export const FETCH_WORK_JOB_PROVINCE = gql`
  query workJobOfProvince($provinceId: ID!) {
    provinceDetail(id: $provinceId) {
      name
    }
    workJobOfProvince(provinceId: $provinceId) {
      paginatorInfo {
        total
        perPage
        firstItem
        lastPage
        currentPage
        lastItem
      }
      data {
        id
        name
        slug
        updated_at
        expired_date

        salary
        company {
          slug
          logo
        }
        work_category {
          name
        }
        province {
          name
        }
      }
    }
  }
`;
export const FETCH_USER_APPLIED_JOB = gql`
  query fetch_user_appied_job($userId: ID!) {
    workJobAppliedByUser(userId: $userId) {
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
        cv_url
        letter
        status
        work_job {
          id
          name
          slug
          province {
            name
          }
          company {
            name
            logo
            slug
          }
          salary
        }
        created_at
        updated_at
        deleted_at
      }
    }
  }
`;

export const FETCH_WORK_JOB_EDIT = gql`
  query workJobDetail($id: ID!) {
    getWorkJobById(id: $id) {
      id
      name
      slug
      description
      benefit
      requirement
      requirement_exp
      requirement_gender
      requirement_age
      amount_hiring
      amount_apply
      address_work
      salary
      type
      expired_date
      province {
        id
      }
      company {
        id
      }
      work_category {
        id
      }
      created_at
      updated_at
    }
  }
`;

export const FETCH_ALL_WORKJOB_MANAGE = gql`
  query workJobByCompany($companyId: ID!, $page: Int) {
    workJobByCompany(companyId: $companyId, page: $page) {
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
        name
        slug
        description
        benefit
        requirement
        requirement_exp
        requirement_gender
        requirement_age
        amount_hiring
        amount_apply
        address_work
        salary
        type
        is_open
        expired_date
        work_applies {
          id
        }
        created_at
        updated_at
      }
    }
  }
`;
