import { gql } from "@apollo/client";

export const UPDATE_COMPANY = gql`
  mutation updateCompany(
    $id: ID
    $name: String!
    $description: String!
    $amount_employee: String!
    $website: String!
    $fanpage: String!
    $address: String!
    $gg_map: String!
    $logo: String!
    $banner: String!
  ) {
    updateCompany(
      input: {
        id: $id
        name: $name
        description: $description
        amount_employee: $amount_employee
        website: $website
        fanpage: $fanpage
        address: $address
        gg_map: $gg_map
        logo: $logo
        banner: $banner
      }
    ) {
      status
      message
    }
  }
`;
