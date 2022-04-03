import { gql } from "@apollo/client";

export const FETCH_USER_ROLE_HR_UNMANAGE = gql`
  query users {
    hrUnManage {
      id
      email
      lastname
      firstname
    }
  }
`;

export const FETCH_ALL_USER_MANAGE = gql`
  query users($page: Int!, $role: String, $name: String) {
    getAllUsers(page: $page, role: $role, name: $name) {
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
        email
        lastname
        firstname
        avatar
        role {
          id
          name
        }
        company {
          name
        }
      }
    }
  }
`;

export const FETCH_USER_DETAIL_MANAGER = gql`
  query users($id: ID!) {
    user(id: $id) {
      id
      lastname
      firstname
      address
      email
      phone
      birthday
      gender
      avatar
      coin
      role {
        id
        name
      }
      company {
        id
      }
    }
  }
`;
