import { gql } from 'apollo-server-express'

export const taskListTypeDefs = gql`
  type Mutation {
    createTaskList(collabId: ID!, name: String!, order: Int!): TaskList!
    deleteTaskList(taskListId: ID!): Boolean!
  }

  type TaskList {
    id: ID!
    name: String!
    order: Int!
    tasks: [Task!]!
    collab: Collab
  }
`
