import { shield } from 'graphql-shield'
import { merge } from 'lodash'
import { collabMiddleware } from '../resolvers/Collab'
import { collabPostReactionMiddleware } from '../resolvers/CollabPostReaction'
import { userMiddleware } from '../resolvers/User'
import { collabPostCommentMiddleware } from '../resolvers/CollabPostComment'
import { collabTaskMiddleware } from '../resolvers/Task'
import { collabTaskListMiddleware } from '../resolvers/TaskList'
import { collabTaskCommentMiddleware } from '../resolvers/TaskComment'
import { collabDiscussionThreadMiddleware } from '../resolvers/CollabDiscussionThread'
import { collabDiscussionThreadCommentMiddleware } from '../resolvers/CollabDiscussionThreadComment'
import { collabPostMiddleware } from '../resolvers/CollabPost'
import { collabPostCommentReactionMiddleware } from '../resolvers/CollabPostCommentReaction'
import { collabDiscussionThreadReactionMiddleware } from '../resolvers/CollabDiscussionThreadReaction'
import { collabDiscussionThreadCommentReactionMiddleware } from '../resolvers/CollabDiscussionThreadCommentReaction'
import { collabTaskCommentReactionMiddleware } from '../resolvers/CollabTaskCommentReaction'
import { collabWallMessageMiddleware } from '../resolvers/CollabWallMessage'
import { privateChatMiddleware } from '../resolvers/PrivateChat'

export const permissions = shield(
  merge(
    userMiddleware,
    collabPostMiddleware,
    collabPostReactionMiddleware,
    collabMiddleware,
    collabPostCommentMiddleware,
    collabPostCommentReactionMiddleware,
    collabTaskListMiddleware,
    collabTaskMiddleware,
    collabTaskCommentMiddleware,
    collabTaskCommentReactionMiddleware,
    collabWallMessageMiddleware,
    collabDiscussionThreadMiddleware,
    collabDiscussionThreadReactionMiddleware,
    collabDiscussionThreadCommentMiddleware,
    collabDiscussionThreadCommentReactionMiddleware,
    privateChatMiddleware,
  ),
  { allowExternalErrors: true },
)
