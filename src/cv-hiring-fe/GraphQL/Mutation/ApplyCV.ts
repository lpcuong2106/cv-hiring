import { gql } from "@apollo/client";
export const APPLY_CV = gql`
  mutation applyCV($content: String!, $fileCV: Upload!, $jobId: ID!) {
    applyCV(content: $content, fileCV: $fileCV, jobId: $jobId) {
      id
      path
    }
  }
`;
