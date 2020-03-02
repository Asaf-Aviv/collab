import { User } from './User'
import { Collab } from './Collab'
import { CollabComment } from './CollabComment'
import { CollabMember } from './CollabMember'
import { CollabTask } from './CollabTask'
import { CollabTaskList } from './CollabTaskList'
import { CollabTaskComment } from './CollabTaskComment'
import { CollabMemberRequest } from './CollabMemberRequest'
import { CollabDiscussionMessage } from './CollabDiscussionMessage'

export const models = {
  User,
  Collab,
  CollabComment,
  CollabMember,
  CollabTaskList,
  CollabTask,
  CollabTaskComment,
  CollabMemberRequest,
  CollabDiscussionMessage,
}

export type Models = typeof models
