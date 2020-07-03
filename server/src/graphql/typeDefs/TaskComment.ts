import { gql } from 'apollo-server-express'

export const taskCommentTypeDefs = gql`
  type Mutation {
    createTaskComment(input: CreateTaskCommentInput!): TaskComment!
    deleteTaskComment(commentId: ID!): Boolean!
  }

  type TaskComment {
    id: ID!
    content: String!
    author: User
    task: Task
    reactions: [Reaction!]!
    creationDate: Date!
  }

  input CreateTaskCommentInput {
    collabId: ID!
    taskId: ID!
    content: String!
  }
`
