import { gql } from "@apollo/client";

export const UPDATE_SETTING = gql`
  mutation updateSetting(
    $id: ID
    $title_web: String
    $description: String
    $logo_url: String
    $fb_url: String
    $youtube_url: String
    $phone_contact: String
    $price_job: Int
  ) {
    updateSetting(
      input: {
        id: $id
        title_web: $title_web
        description: $description
        logo_url: $logo_url
        fb_url: $fb_url
        youtube_url: $youtube_url
        phone_contact: $phone_contact
        price_job: $price_job
      }
    ) {
      status
      message
    }
  }
`;
