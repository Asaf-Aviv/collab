import { gql } from 'apollo-server-express'

export const collabTypeDefs = gql`
  type Query {
    collabs: [Collab!]!
    collab(collabId: ID!): Collab
  }

  type Mutation {
    deleteCollab(collabId: ID!): Boolean!
    inviteMember(collabId: ID!, memberId: ID!): User!
    # returns the id of the request
    acceptMemberRequest(collabId: ID!, memberId: ID!): ID!
    # returns the id of the request
    declineMemberRequest(collabId: ID!, memberId: ID!): ID!
    cancelRequestToJoin(collabId: ID!): Boolean!
    removeMember(collabId: ID!, memberId: ID!): Collab!
    requestToJoin(collabId: ID!): Boolean!
    toggleAcceptInvites(collabId: ID!): Collab!
  }

  type Collab {
    id: ID!
    name: String!
    owner: User!
    collabPostId: ID
    acceptsInvites: Boolean!
    members: [User!]!
    isOwner: Boolean!
    isMember: Boolean!
    creationDate: Date!
    invitationPending: Boolean!
    requestToJoinPending: Boolean!
    pendingInvites: [User]!
    pendingRequests: [User]!
    taskList: [TaskList!]!
    discussionThreads: [CollabDiscussionThread!]!
  }
`
