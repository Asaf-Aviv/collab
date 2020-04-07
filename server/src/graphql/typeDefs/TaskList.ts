import { gql } from 'apollo-server-express'

export const taskListTypeDefs = gql`
  type Query {
    taskList(collabId: ID!): [TaskList!]
  }

  type Mutation {
    createTaskList(input: CreateTaskListInput!): TaskList!
    updateTaskListName(input: UpdateTaskListNameInput!): TaskList!
    updateTaskListPosition(input: UpdateTaskListPositionInput!): TaskList!
    deleteTaskList(taskListId: ID!): Boolean!
  }

  input CreateTaskListInput {
    collabId: ID!
    name: String!
  }

  input UpdateTaskListNameInput {
    taskListId: ID!
    name: String!
  }

  input UpdateTaskListPositionInput {
    collabId: ID!
    oldTaskListPosition: Int!
    newTaskListPosition: Int!
  }

  type TaskList {
    id: ID!
    name: String!
    order: Int!
    tasks: [Task!]!
    collab: Collab
  }
`
