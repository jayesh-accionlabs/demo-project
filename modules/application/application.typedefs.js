const { gql } = require('apollo-server-express');
module.exports = gql`

extend type Mutation { 
  createUser(input:createUserInput!): createUserResponse
  getUser(input:getUserInput!): getUserResponse 
}

input createUserInput {
  user_name : String
  password : String
  email : String
}

input getUserInput {
  user_name : String
}

type createUserResponse {
  message : String
}

type getUserResponse {
  message : String
  user_details : UserDetails
}

type UserDetails {
  _id: String,
  user_name: String,
  password: String,
  email: String,
  created_at: String,
  updated_at: String
}
`;
