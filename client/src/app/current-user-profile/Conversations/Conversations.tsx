import React from 'react'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { Box, Heading, Flex, Text, Avatar, PseudoBox } from '@chakra-ui/core'
import { useCurrentUserConversationsPreviewQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'

export const Conversations = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useCurrentUserConversationsPreviewQuery()
  const match = useRouteMatch()

  const { conversationsPreview } = data?.currentUser || {}

  return (
    <Box as="main" flex={1} pb={4}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Your Conversations
      </Heading>
      {conversationsPreview?.map(({ userId, username, avatar, content }) => (
        <PseudoBox
          key={userId}
          as={NavLink}
          // @ts-ignore
          to={`${match.url}/${userId}`}
          py={4}
          px={2}
          _notFirst={{
            borderTop: '1px solid #e1e1e1',
          }}
          display="block"
          _hover={{
            bg: '#EEE',
          }}
        >
          {username ? (
            <Flex align="center" mb={4}>
              <Avatar src={avatar} name={username} size="sm" mr={2} />
              <Text as="h3" fontWeight={500}>
                {username}
              </Text>
            </Flex>
          ) : (
            <Text as="span">Deleted user</Text>
          )}
          <Text pl={10} isTruncated>
            {content}
          </Text>
        </PseudoBox>
      ))}
      {loading && <Loader />}
      {error && (
        <DisplayError
          message="Could not fetch friends"
          onClick={() => refetch()}
        />
      )}
    </Box>
  )
}
// ;<Box as="main" flex={1} pb={4}>
//   <section>
//     {messages?.map(message => (
//       <Box key={message.id} py={4} px={2} borderBottom="1px solid #e1e1e1">
//         <Flex align="center" mb={4}>
//           {message.author ? (
//             <AvatarWithUsername size="sm" {...message.author} />
//           ) : (
//             <Text>Deleted user</Text>
//           )}
//           <DisplayDate ml={2} date={message.creationDate} />
//         </Flex>
//         <Text>{message.content}</Text>
//       </Box>
//     ))}
//     {loading && <Loader />}
//     {error && (
//       <DisplayError
//         message="Could not fetch conversation"
//         onClick={() => refetch()}
//       />
//     )}
//   </section>
// </Box>
