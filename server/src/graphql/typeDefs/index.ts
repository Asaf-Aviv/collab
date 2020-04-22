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
import { privateMessageTypeDefs } from './PrivateMessage'
import { scalarTypeDefs } from './Scalar'
import { privateChatTypeDefs } from './PrivateChat'

const types = [
  scalarTypeDefs,
  userTypeDefs,
  privateMessageTypeDefs,
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
  privateChatTypeDefs,
]

export const typeDefs = mergeTypes(types, { all: true })
