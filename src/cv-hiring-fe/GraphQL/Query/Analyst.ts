import { gql } from "@apollo/client";

export const ANALYST_ADMIN = gql`
  query analyst_admin($companyId: ID) {
    analystWorkJob(companyId: $companyId) {
      total_work_job
      total_work_job_hiring
      total_cv_applied
      total_cv_new_applied
    }
  }
`;

export const ANALYST_TRENDING = gql`
  query analyst_trending {
    analystTrend {
      category {
        name
        amountJob
      }
    }
  }
`;

export const FETCH_SETTING = gql`
  query settingWebsite {
    settingWebsite {
      id
      title_web
      description
      logo_url
      fb_url
      youtube_url
      phone_contact
    }
  }
`;
