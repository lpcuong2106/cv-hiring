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
      expired_date_hiring
      description
      amount_hiring
      requirement_gender
      requirement_exp
      requirement_age
      type
      updated_at
      created_at
      work_category {
        id
        name
      }
      company {
        logo
        name
        slug
        address
        description
        amount_employee
        avgReview
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
    $rating: String
    $type: String
    $requirementGender: String
  ) {
    getAllWorkJob(
      page: $page
      input: {
        name: $name
        provinceId: $provinceId
        categoryId: $categoryId
        rating: $rating
        requirementGender: $requirementGender
        type: $type
      }
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
        expired_date_hiring
        updated_at
        work_category {
          name
        }
        company {
          logo
          name
          slug
          avgReview
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
      expired_date_hiring
      work_category {
        name
      }
      salary
      province {
        name
      }
    }
  }
`;
export const FETCH_WORK_JOB_PROVINCE = gql`
  query workJobOfProvince($provinceId: ID!, $page: Int) {
    provinceDetail(id: $provinceId) {
      name
    }
    workJobOfProvince(provinceId: $provinceId, page: $page) {
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
        expired_date_hiring

        salary
        company {
          name
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
export const FETCH_WORK_JOB_CATEGORY = gql`
  query workJobOfCategory($categoryId: ID!, $page: Int) {
    categoryDetail(id: $categoryId) {
      name
    }
    workJobOfCategory(categoryId: $categoryId, page: $page) {
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
        expired_date_hiring

        salary
        company {
          name
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
      expired_date_hiring
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
  query workJobByCompany(
    $companyId: ID
    $page: Int
    $name: String
    $status: String
  ) {
    workJobByCompany(
      companyId: $companyId
      name: $name
      status: $status
      page: $page
    ) {
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
        expired_date_hiring
        work_applies {
          id
        }
        company {
          name
        }
        created_at
        updated_at
      }
    }
  }
`;

export const FETCH_ALL_CV_APPLIED = gql`
  query allCvApplied($companyId: ID, $page: Int) {
    allCvApplied(companyId: $companyId, page: $page) {
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
        user {
          id
          firstname
          lastname
          email
        }
        work_job {
          name
          slug
          company {
            name
            slug
          }
        }
        created_at
        updated_at
        deleted_at
      }
    }
  }
`;
