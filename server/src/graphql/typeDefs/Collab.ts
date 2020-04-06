import { gql } from 'apollo-server-express'

export const collabTypeDefs = gql`
  type Query {
    collabs: [Collab!]!
    collab(collabId: ID!): Collab
  }

  type Mutation {
    deleteCollab(collabId: ID!): Boolean!
    inviteMember(collabId: ID!, memberId: ID!): User!
    acceptMemberRequest(collabId: ID!, memberId: ID!): Collab!
    removeMember(collabId: ID!, memberId: ID!): Collab!
    requestToJoin(collabId: ID!): Boolean!
    cancelRequestToJoin(collabId: ID!): Boolean!
    toggleAcceptInvites(collabId: ID!): Collab!
    declineMemberRequest(collabId: ID!, memberId: ID!): Boolean!
  }

  type Collab {
    id: ID!
    name: String!
    owner: User
    collabPostId: ID
    frontPagePost: String
    acceptsInvites: Boolean!
    members: [User!]!
    isOwner: Boolean!
    isMember: Boolean!
    invitationPending: Boolean!
    requestToJoinPending: Boolean!
    pendingInvites: [User]!
    pendingRequests: [User]!
    taskList: [TaskList!]!
    discussionThreads: [CollabDiscussionThread!]!
  }
`
