import { gql } from "@apollo/client";
export const SOFT_DELETE_WORKJOB = gql`
  mutation cancelAppliedWorkJob($workAppliedId: ID!) {
    cancelAppliedWorkJob(workAppliedId: $workAppliedId) {
      status
      message
    }
  }
`;
