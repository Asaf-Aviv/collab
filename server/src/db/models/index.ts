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
import { Language } from './Language'
import { Stack } from './Stack'
import { CollabPostStack } from './CollabPostStack'
import { CollabPostLanguage } from './CollabPostLanguage'

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
  Stack,
  CollabPostStack,
}

export type Models = typeof models
