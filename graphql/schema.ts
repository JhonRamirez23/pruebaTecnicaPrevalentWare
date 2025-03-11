import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: Int!
    name: String
    email: String
    role: Role!
    transactions: [Transaction!]!
  }

  type Transaction {
    id: Int!
    concept: String!
    amount: Float!
    date: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    updateUser(id: Int!, name: String!, role: Role!): User!
    createUser(name: String!, email: String!, role: Role!): User!
    addTransaction(
      concept: String!
      amount: Float!
      date: String!
    ): Transaction!
  }
`;
