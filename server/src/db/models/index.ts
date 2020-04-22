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
import { CollabPostReaction } from './CollabPostReaction'
import { CollabPostCommentReaction } from './CollabPostCommentReaction'
import { CollabDiscussionThreadReaction } from './CollabDiscussionThreadReaction'
import { CollabDiscussionThreadCommentReaction } from './CollabDiscussionThreadCommentReaction'
import { CollabTaskCommentReaction } from './CollabTaskCommentReaction'
import { UserFriend } from './UserFriend'
import { UserFriendRequest } from './UserFriendRequest'
import { PrivateMessage } from './PrivateMessage'

export const models = {
  Language,
  CollabPostLanguage,
  User,
  Stack,
  CollabPostStack,
  CollabPost,
  Collab,
  CollabPostReaction,
  CollabPostComment,
  CollabPostCommentReaction,
  CollabMember,
  CollabTaskList,
  CollabTask,
  CollabTaskComment,
  CollabMemberRequest,
  CollabDiscussionThread,
  CollabDiscussionThreadComment,
  CollabDiscussionThreadReaction,
  CollabDiscussionThreadCommentReaction,
  CollabTaskCommentReaction,
  UserFriend,
  UserFriendRequest,
  PrivateMessage,
}

export type Models = typeof models
