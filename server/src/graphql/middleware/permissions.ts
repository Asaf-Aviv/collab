import { shield } from 'graphql-shield'
import { collabMiddleware } from './../resolvers/Collab'
import { userMiddleware } from './../resolvers/User'
import { collabPostCommentMiddleware } from '../resolvers/CollabPostComment'
import { collabTaskMiddleware } from '../resolvers/Task'
import { collabTaskListMiddleware } from '../resolvers/TaskList'
import { collabTaskCommentMiddleware } from '../resolvers/TaskComment'
import { collabDiscussionThreadMiddleware } from '../resolvers/CollabDiscussionThread'
import { collabDiscussionThreadCommentMiddleware } from '../resolvers/CollabDiscussionThreadComment'

export const permissions = shield(
  Object.assign(
    {},
    userMiddleware,
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
