import { gql } from 'apollo-server-express'

const collabTypeDefs = gql`
  type Query {
    collabs: [Collab!]!
    collab(collabId: ID!): Collab
  }

  type Mutation {
    createCollab(collab: CollabArgs!): Collab!
    deleteCollab(collabId: ID!): Boolean!
    inviteMember(collabId: ID!, memberId: ID!): User!
    addMember(collabId: ID!, memberId: ID!): Collab!
    removeMember(collabId: ID!, memberId: ID!): Collab!
    requestToJoin(collabId: ID!): Boolean!
    addComment(content: String!, collabId: ID!): CollabComment!
    deleteComment(commentId: ID!): Boolean!
  }

  type Collab {
    id: ID!
    name: String!
    title: String!
    ownerId: ID!
    owner: User!
    experience: String!
    stack: [String!]!
    hasStarted: Boolean!
    acceptsInvites: Boolean!
    description: String!
    members: [User!]!
    comments: [CollabComment!]!
    pendingInvites: [User!]!
  }

  input CollabArgs {
    name: String!
    title: String!
    experience: Experience!
    stack: [String!]!
    description: String!
    hasStarted: Boolean!
  }

  type CollabComment {
    id: ID!
    content: String!
    authorId: ID!
    author: User!
    collabId: ID!
    collab: Collab!
  }

  enum Experience {
    ALL
    JUNIOR
    JUNIOR_MID
    MID
    MID_SENIOR
    SENIOR
  }
`

export default collabTypeDefs
