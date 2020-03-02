import { gql } from 'apollo-server-express'

export const collabTypeDefs = gql`
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
    toggleAcceptInvites(collabId: ID!): Collab!
    declineMemberRequest(collabId: ID!, memberId: ID!): Boolean!
  }

  type Collab {
    id: ID!
    name: String!
    title: String!
    ownerId: ID!
    owner: User
    experience: String!
    stack: [String!]!
    hasStarted: Boolean!
    acceptsInvites: Boolean!
    description: String!
    members: [User]!
    comments: [CollabComment!]!
    pendingInvites: [User]!
    pendingRequests: [User]!
    taskList: [TaskList!]!
    discussionMessages: [CollabDiscussionMessage!]!
  }

  input CollabArgs {
    name: String!
    title: String!
    experience: Experience!
    stack: [String!]!
    description: String!
    hasStarted: Boolean!
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
