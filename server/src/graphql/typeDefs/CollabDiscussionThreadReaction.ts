import { gql } from 'apollo-server-express'

export const collabDiscussionThreadReactionTypeDefs = gql`
  type Mutation {
    addCollabDiscussionThreadReaction(
      reaction: AddCollabDiscussionThreadReactionInput!
    ): Boolean!
    removeCollabDiscussionThreadReaction(
      reaction: RemoveCollabDiscussionThreadReactionInput!
    ): Boolean!
  }

  input AddCollabDiscussionThreadReactionInput {
    emojiId: ID!
    threadId: ID!
  }

  input RemoveCollabDiscussionThreadReactionInput {
    emojiId: ID!
    threadId: ID!
  }
`
