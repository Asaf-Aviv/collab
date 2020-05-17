import React, { memo } from 'react'
import { CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, Heading, Link, Text, PseudoBoxProps } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername'
import { Paper } from '../global'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount'
import { DisplayDate } from '../DisplayDate/DisplayDate'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import { PostTag } from '../PostTag'

type Post = NonNullable<CollabPostsQuery['collabPosts']>['posts'][0]

type Props = Post & PseudoBoxProps

export const CollabPostCard = memo(
  ({
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
  }: Props) => {
    return (
      <Paper flexDirection="column" as="article" {...props}>
        <Flex p={3} w="100%" align="center" justify="space-between">
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
        <Link
          as={RouterLink as any}
          // @ts-ignore
          to={`/collabs/posts/${id}`}
          pl={12}
          pr={3}
          py={2}
          w="100%"
          position="relative"
          flex={1}
          _hover={{ textDecoration: 'none' }}
        >
          <Heading size="sm" fontWeight={600} as="h3">
            {title}
          </Heading>
        </Link>
        <Flex
          pl={12}
          pr={3}
          py={2}
          w="100%"
          wrap="wrap"
          align="center"
          justify="space-between"
        >
          <Flex pt={2} wrap="wrap">
            <PostTag mb={2}>{experience}</PostTag>
            {languages.map(language => (
              <PostTag key={language} mb={2}>
                {language}
              </PostTag>
            ))}
            {stack.map(tech => (
              <PostTag key={tech} mb={2}>
                {tech}
              </PostTag>
            ))}
          </Flex>
          <Flex align="center" flexShrink={0} roundedBottom={6}>
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
  },
)

CollabPostCard.displayName = 'CollabPostCard'
