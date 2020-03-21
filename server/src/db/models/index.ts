import { CollabPostLanguage } from './CollabPostLanguage'
import { User } from './User'
import { Collab } from './Collab'
import { CollabPost } from './CollabPost'
import { CollabPostComment } from './CollabPostComment'
import { CollabMember } from './CollabMember'
import { CollabTask } from './CollabTask'
import { CollabTaskList } from './CollabTaskList'
import { CollabTaskComment } from './CollabTaskComment'
import { CollabMemberRequest } from './CollabMemberRequest'
import { CollabDiscussionThread } from './CollabDiscussionThread'
import { CollabDiscussionThreadComment } from './CollabDiscussionThreadComment'
import { Language } from './Languages'

export const models = {
  User,
  Collab,
  CollabPost,
  CollabPostComment,
  CollabMember,
  CollabTaskList,
  CollabTask,
  CollabTaskComment,
  CollabMemberRequest,
  CollabDiscussionThread,
  CollabDiscussionThreadComment,
  Language,
  CollabPostLanguage,
}

export type Models = typeof models
