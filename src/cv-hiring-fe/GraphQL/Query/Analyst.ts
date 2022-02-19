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
