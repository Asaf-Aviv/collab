import React from 'react'
import { Text } from '@chakra-ui/core'
import { useGetCurrentUserTasksQuery } from '../../../graphql/generates'

export const Tasks = () => {
  const { data, loading, error } = useGetCurrentUserTasksQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch tasks</span>
  if (!data?.currentUser) return null

  const { tasks } = data.currentUser
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <Text>{task.collab.name}</Text>
          <Text> Assigned by {task.assignedBy?.username}</Text>
          <Text>{task.description}</Text>
        </div>
      ))}
    </div>
  )
}
