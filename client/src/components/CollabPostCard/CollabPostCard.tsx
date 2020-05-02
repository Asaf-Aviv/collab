import React, { memo } from 'react'
import { CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Heading,
  Tag,
  Link,
  Text,
  PseudoBoxProps,
  TagProps,
} from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { Paper } from '../global'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount/CommentsAndReactionsCount'
import { DisplayDate } from '../DisplayDate/DisplayDate'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import { PostTag } from '../PostTag'

type Post = NonNullable<CollabPostsQuery['collabPosts']>['posts'][0]

type Props = Post & PseudoBoxProps

type HeaderProps = {
  owner: Post['owner']
  createdAt: Post['createdAt']
  isNew: Post['isNew']
}
const CollabPostCardHeader = ({ owner, createdAt, isNew }: HeaderProps) => (
  <Flex p={2} w="100%" align="center" justify="space-between">
    <Flex align="center" wrap="wrap">
      <AvatarWithUsername size="sm" {...owner} />
      <DisplayDate date={createdAt} px={2} />
    </Flex>
    {isNew && (
      <PostTag order={1} variantColor="green">
        NEW
      </PostTag>
    )}
  </Flex>
)

export const CollabPostCard = memo(function CollabPostCard({
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
  ...props
}: Props) {
  return (
    <Paper flexDirection="column" as="article" {...props}>
      <CollabPostCardHeader owner={owner} isNew={isNew} createdAt={createdAt} />
      <Link
        as={RouterLink as any}
        // @ts-ignore
        to={`/collabs/posts/${id}`}
        h="100%"
        pl={12}
        pr={2}
        w="100%"
        flex={1}
        _hover={{ textDecoration: 'none' }}
      >
        <Heading size="sm" fontWeight={500} pb={6} as="h2">
          {title}
        </Heading>
      </Link>
      <Flex
        bg="#f2f2ff"
        px={2}
        pb={3}
        w="100%"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex pt={2}>
          <PostTag mr={2}>{experience}</PostTag>
          {languages.map(language => (
            <PostTag key={language} mr={2}>
              {language}
            </PostTag>
          ))}
          {stack.map(tech => (
            <PostTag key={tech} mr={2}>
              {tech}
            </PostTag>
          ))}
        </Flex>
        <Flex align="center" flexShrink={0} pt={3}>
          <PeopleOutlineIcon />
          <Text as="span" ml="3px" mr={3} fontWeight={700}>
            {membersCount}
          </Text>
          <CommentsAndReactionsCount
            reactionsCount={reactionsCount}
            commentsCount={commentsCount}
          />
        </Flex>
      </Flex>
    </Paper>
  )
})
