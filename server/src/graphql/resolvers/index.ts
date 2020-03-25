import { collabTaskListResolver } from './TaskList'
import { mergeResolvers } from 'merge-graphql-schemas'
import { collabPostCommentResolver } from './CollabPostComment'
import { userResolver } from './User'
import { collabResolver } from './Collab'
import { taskCommentResolver } from './TaskComment'
import { collabTaskResolver } from './Task'
import { collabDiscussionThreadResolver } from './CollabDiscussionThread'
import { collabDiscussionThreadCommentResolver } from './CollabDiscussionThreadComment'
import { collabPostResolver } from './CollabPost'
import { collabPostReactionResolver } from './CollabPostReaction'

export const resolvers = mergeResolvers([
  userResolver,
  collabResolver,
  taskCommentResolver,
  collabPostResolver,
  collabTaskResolver,
  collabTaskListResolver,
  collabPostCommentResolver,
  collabDiscussionThreadResolver,
  collabDiscussionThreadCommentResolver,
  collabPostReactionResolver,
])
