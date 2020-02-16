import { gql } from 'apollo-server-express'

const collabTypeDefs = gql`
  type Query {
    collabs: [Collab!]!
  }

  type Mutation {
    # user model will come througt context, for now use userId as args
    createCollab(collab: CollabArgs!): Collab!
    deleteCollab(id: ID!): Boolean!
  }

  type Collab {
    id: ID!
    ownerId: ID!
    owner: User!
    experience: String!
    stack: [String!]!
    description: String!
  }

  input CollabArgs {
    experience: Experience!
    stack: [String!]!
    description: String!
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
