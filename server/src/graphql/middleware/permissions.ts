import { shield } from 'graphql-shield'
import { collabMiddleware } from './../resolvers/Collab'
import { userMiddleware } from './../resolvers/User'
import { collabCommentMiddleware } from '../resolvers/CollabComment'
import { collabTaskMiddleware } from '../resolvers/Task'
import { collabTaskListMiddleware } from '../resolvers/TaskList'
import { collabTaskCommentMiddleware } from '../resolvers/TaskComment'
import { collabDiscussionMessageMiddleware } from '../resolvers/collabDiscussionMessage'

export const permissions = shield(
  {
    ...userMiddleware,
    ...collabMiddleware,
    ...collabCommentMiddleware,
    ...collabTaskListMiddleware,
    ...collabTaskMiddleware,
    ...collabTaskCommentMiddleware,
    ...collabDiscussionMessageMiddleware,
  },
  { allowExternalErrors: true }
)
