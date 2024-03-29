import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $lastname: String
    $firstname: String
    $address: String
    $phone: String
    $birthday: String
    $gender: GenderEnum
    $avatar: Upload
  ) {
    updateProfile(
      input: {
        lastname: $lastname
        firstname: $firstname
        address: $address
        phone: $phone
        birthday: $birthday
        gender: $gender
        avatar: $avatar
      }
    ) {
      status
      message
    }
  }
`;
