export const REGISTER = `
  mutation REGISTER(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`

export const LOGIN = `
  mutation LOGIN($email: String!, $password: String!) {
    authenticateUserWithPassword(
      email: $email
      password: $password
    ) {
      item {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const LOGOUT = `
  mutation LOGOUT {
    unauthenticateUser {
      success
    }
  }
`

export const CHECK_USER = `
  query CHECK_USER {
    authenticatedUser {
      id,
      firstName,
      lastName,
      email
    }
  }
`

export const UPDATE_USER = `
  mutation UPDATE_USER(
    $id: ID!,
    $firstName: String!,
    $lastName: String!,
  ) {
    updateUser(
      id: $id
      data: {
        firstName: $firstName,
        lastName: $lastName
      }
    ) {
      id,
      firstName,
      lastName,
      email
    }
  }
`

export const UPDATE_USER_WITH_PASSWORD = `
  mutation UPDATE_USER(
    $id: ID!,
    $firstName: String!,
    $lastName: String!,
    $password: String!
  ) {
    updateUser(
      id: $id
      data: {
        firstName: $firstName,
        lastName: $lastName,
        password: $password
      }
    ) {
      id,
      firstName,
      lastName,
      email
    }
  }
`