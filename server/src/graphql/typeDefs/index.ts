import { mergeTypes } from 'merge-graphql-schemas'
import { userTypeDefs } from './User'
import { collabTypeDefs } from './Collab'
import { taskTypeDefs } from './Task'
import { taskListTypeDefs } from './TaskList'
import { collabPostTypeDefs } from './CollabPost'
import { taskCommentTypeDefs } from './TaskComment'
import { collabPostCommentTypeDefs } from './CollabPostComment'
import { collabDiscussionThreadTypeDefs } from './CollabDisussionThread'
import { collabDiscussionThreadCommentTypeDefs } from './CollabDiscussionThreadComment'
import { ReactionTypeDefs } from './Reaction'
import { collabPostReactionTypeDefs } from './CollabPostReaction'
import { collabPostCommentReactionTypeDefs } from './CollabPostCommentReaction'
import { collabDiscussionThreadReactionTypeDefs } from './CollabDiscussionThreadReaction'
import { collabDiscussionThreadCommentReactionTypeDefs } from './CollabDiscussionThreadCommentReaction'
import { collabTaskCommentReactionTypeDefs } from './CollabTaskCommentReaction'

const types = [
  userTypeDefs,
  collabTypeDefs,
  collabPostCommentTypeDefs,
  collabPostTypeDefs,
  taskTypeDefs,
  taskListTypeDefs,
  taskCommentTypeDefs,
  collabDiscussionThreadTypeDefs,
  collabDiscussionThreadCommentTypeDefs,
  ReactionTypeDefs,
  collabPostReactionTypeDefs,
  collabPostCommentReactionTypeDefs,
  collabDiscussionThreadReactionTypeDefs,
  collabDiscussionThreadCommentReactionTypeDefs,
  collabTaskCommentReactionTypeDefs,
]

export const typeDefs = mergeTypes(types, { all: true })
