import { mergeResolvers } from 'merge-graphql-schemas'
import { collabCommentResolver } from './CollabComment'
import { userResolver } from './User'
import { collabResolver } from './Collab'
import { taskCommentResolver } from './TaskComment'
import { collabTaskResolver } from './Task'
import { collabDiscussionMessageResolver } from './collabDiscussionMessage'

export const resolvers = mergeResolvers([
  userResolver,
  collabResolver,
  taskCommentResolver,
  collabTaskResolver,
  collabCommentResolver,
  collabDiscussionMessageResolver,
])
