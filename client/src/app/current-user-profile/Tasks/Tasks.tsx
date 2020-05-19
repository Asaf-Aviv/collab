import React from 'react'
import { Box, Text, Heading, PseudoBox } from '@chakra-ui/core'
import { useGetCurrentUserTasksQuery } from '../../../graphql/generates'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import styled from '@emotion/styled'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const Tasks = () => {
  const { data, loading, error, refetch } = useGetCurrentUserTasksQuery()
  const currentUser = useCurrentUser()

  const { tasks } = data?.currentUser || {}

  return (
    <Box as="main" flex={1} pb={4}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Your Tasks
      </Heading>
      <section>
        {tasks?.map(task => (
          <PseudoBox
            key={task.id}
            py={4}
            px={2}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Text as="h3" fontWeight={600} fontSize="1.25rem">
              Collab:{' '}
              <Link to={`/collab/${task.collab.id}/task-board`}>
                {task.collab.name}
              </Link>
            </Text>
            {task.assignedBy && task.assignedBy.id === currentUser!.id && (
              <Text>
                Assigned by{' '}
                <StyledLink to={`/user/${task.assignedBy.id}`}>
                  {task.assignedBy.username}
                </StyledLink>
              </Text>
            )}
            <Text mt={4}>{task.description}</Text>
          </PseudoBox>
        ))}
        {loading && <Loader />}
        {error && (
          <DisplayError
            message="Could not fetch tasks"
            onClick={() => refetch()}
          />
        )}
      </section>
    </Box>
  )
}

const StyledLink = styled(Link)`
  font-weight: 600;
`
