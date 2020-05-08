import React from 'react'
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom'
import { Flex } from '@chakra-ui/core'
import { Conversation } from '../Conversation'
import { useCurrentUserConversationsPreviewQuery } from '../../../graphql/generates'

export const Conversations = () => {
  const { data, loading, error } = useCurrentUserConversationsPreviewQuery()
  const { path } = useRouteMatch()

  if (loading) return <span>loading...</span>
  if (error) return <span>Could not fetch conversations</span>
  if (!data?.currentUser) return null

  const { conversationsPreview } = data.currentUser

  return (
    <Flex>
      {conversationsPreview.map(conversation => (
        <NavLink
          key={conversation.userId}
          to={`${path}/${conversation.userId}`}
        >
          <Flex>{conversation.username}</Flex>
        </NavLink>
      ))}
      <Switch>
        <Route path={`${path}/:userId`} component={Conversation} />
      </Switch>
    </Flex>
  )
}
