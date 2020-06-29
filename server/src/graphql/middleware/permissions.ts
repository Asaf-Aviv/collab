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

export const permissions = shield(
  merge(
    userMiddleware,
    collabPostMiddleware,
    collabPostReactionMiddleware,
    collabMiddleware,
    collabPostCommentMiddleware,
    collabTaskListMiddleware,
    collabTaskMiddleware,
    collabTaskCommentMiddleware,
    collabDiscussionThreadMiddleware,
    collabDiscussionThreadCommentMiddleware,
  ),
  { allowExternalErrors: true },
)
