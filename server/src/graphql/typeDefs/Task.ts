import { gql } from 'apollo-server-express'

export const taskTypeDefs = gql`
  type Query {
    task(taskId: ID!): Task
  }

  type Mutation {
    createTask(collabId: ID!, taskListId: ID!, description: String!): Task!
    deleteTask(taskId: ID!): Boolean!
  }

  type Task {
    id: ID!
    description: ID!
    authorId: ID!
    author: User!
    comments: [TaskComment!]!
  }
`
