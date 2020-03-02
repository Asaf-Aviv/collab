import { mergeTypes } from 'merge-graphql-schemas'
import { userTypeDefs } from './User'
import { collabTypeDefs } from './Collab'
import { taskTypeDefs } from './Task'
import { taskListTypeDefs } from './TaskList'
import { taskCommentTypeDefs } from './TaskComment'
import { collabCommentTypeDefs } from './CollabComment'
import { collabDiscussionMessageTypeDefs } from './CollabDiscussionMessage'

const types = [
  userTypeDefs,
  collabTypeDefs,
  collabCommentTypeDefs,
  taskTypeDefs,
  taskListTypeDefs,
  taskCommentTypeDefs,
  collabDiscussionMessageTypeDefs,
]

export const typeDefs = mergeTypes(types, { all: true })
