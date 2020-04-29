import React from 'react'
import { CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, Heading, Tag, Link, Text } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { Paper } from '../global'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount/CommentsAndReactionsCount'
import { formatDate } from '../../utils'
import { PostStackTag } from '../PostStackTag/PostStackTag'

export const CollabPostCard = ({
  id,
  title,
  stack,
  experience,
  languages,
  reactionsCount,
  commentsCount,
  createdAt,
  isNew,
  membersCount,
  // hasStarted,
  owner,
}: NonNullable<CollabPostsQuery['collabPosts']>['posts'][0]) => (
  <Paper h="100%" direction="column" align="start" as="article">
    <Flex p={4} w="100%" align="center" justify="space-between">
      <Flex align="center">
        <AvatarWithUsername size="sm" {...owner} />
        <Text ml={2} as="time" fontSize="0.9rem">
          {formatDate(createdAt)}
        </Text>
        <Text ml={2} fontSize="0.9rem">
          {`${membersCount} ${membersCount > 1 ? 'members' : 'member'}`}
        </Text>
      </Flex>
      <Flex align="center">
        <Tag boxShadow="sm" mr={2} size="sm" variantColor="pink">
          {experience}
        </Tag>
        {isNew && (
          <Tag boxShadow="sm" size="sm" variantColor="green">
            NEW
          </Tag>
        )}
      </Flex>
    </Flex>
    <Link
      as={RouterLink as any}
      // @ts-ignore
      to={`/collabs/posts/${id}`}
      h="100%"
      px={4}
      key={id}
      w="100%"
      flex={1}
      _hover={{ textDecoration: 'none' }}
    >
      <Heading size="md" fontWeight={500} pb={6} as="h2">
        {title}
      </Heading>
    </Link>
    <Flex bg="#f2f2ff" p={4} w="100%">
      {languages.map(language => (
        <Tag
          boxShadow="sm"
          size="sm"
          variantColor="purple"
          key={language}
          mr={2}
        >
          {language}
        </Tag>
      ))}
      {stack.map(tech => (
        <PostStackTag key={tech} mr={2}>
          {tech}
        </PostStackTag>
      ))}
      <CommentsAndReactionsCount
        ml="auto"
        reactionsCount={reactionsCount}
        commentsCount={commentsCount}
      />
    </Flex>
  </Paper>
)
