import { gql } from 'apollo-server-express'

export const taskTypeDefs = gql`
  type Query {
    task(taskId: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTaskPosition(input: UpdateTaskPositionInput!): Task!
    updateTaskAssignee(input: UpdateTaskAssigneeInput!): Task!
    moveTaskToList(input: MoveTaskToListInput!): Task!
    deleteTask(taskId: ID!): Boolean!
  }

  type Task {
    id: ID!
    description: ID!
    order: Int!
    taskListId: ID!
    authorId: ID!
    author: User!
    assignee: User
    assignedBy: User
    comments: [TaskComment!]!
    commentsCount: Int!
    collab: Collab!
  }

  input CreateTaskInput {
    collabId: ID!
    taskListId: ID!
    description: String!
    assigneeId: ID
  }

  input UpdateTaskAssigneeInput {
    taskId: ID!
    assigneeId: ID!
  }

  input UpdateTaskPositionInput {
    taskListId: ID!
    oldTaskPosition: Int!
    newTaskPosition: Int!
  }

  input MoveTaskToListInput {
    oldTaskListId: ID!
    newTaskListId: ID!
    oldTaskPosition: Int!
    newTaskPosition: Int!
  }
`
