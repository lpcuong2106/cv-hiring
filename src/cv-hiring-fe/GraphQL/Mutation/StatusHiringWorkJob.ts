import { gql } from "@apollo/client";

export const PAUSE_HIRING_JOB = gql`
  mutation pauseHiring($id: ID!) {
    pauseHiring(id: $id, is_open: 0) {
      status
      message
    }
  }
`;
export const RESUME_HIRING_JOB = gql`
  mutation pauseHiring($id: ID!) {
    pauseHiring(id: $id, is_open: 1) {
      status
      message
    }
  }
`;
