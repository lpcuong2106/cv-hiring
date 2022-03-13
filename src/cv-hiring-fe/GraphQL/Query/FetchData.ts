import { gql } from "@apollo/client";

export const FETCH_USER_LOGIN = gql`
  query FetchUserLogin {
    me {
      id
      email
      lastname
      firstname
      avatar
      phone
      birthday
      address
      gender
      coin
      role {
        id
        name
      }
      company {
        id
        name
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
    settingWebsite {
      id
      title_web
      description
      logo_url
      fb_url
      youtube_url
      phone_contact
      price_job
    }
  }
`;
export const FETCH_PROFILE = gql`
  query FetchUserLogin {
    me {
      id
      email
      lastname
      coin
      firstname
      avatar
      birthday
      gender
      address
      phone
    }
  }
`;

export const FETCH_ALL_PROVINCE_CATEGORY = gql`
  query FetchAllProvinceAndCategory {
    workCategories {
      id
      name
    }
    provinces {
      id
      name
    }
  }
`;

export const FETCH_ALL_CATEGORY = gql`
  query FetchAllCategory {
    workCategories {
      id
      name
      workJob {
        id
      }
    }
  }
`;
export const FETCH_HOME_PAGE = gql`
  query FetchHomePage {
    workCategories {
      id
      name
    }
    provinces {
      id
      name
    }
    newWorkJob(amount: 16) {
      id
      name
      slug
      salary
      type
      expired_date_hiring
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
