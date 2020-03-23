import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTaskListQuery, useTaskCommentsQuery } from '../../graphql/generates'
import { Flex, Button } from '@chakra-ui/core'

export const TaskBoard = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data } = useTaskListQuery({ variables: { collabId } })
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  console.log(data)

  return (
    <Flex>
      {data?.taskList?.map(list => (
        <div key={list.id}>
          {list.tasks.map(task => (
            <div key={task.id}>
              {task.description}
              <Button onClick={() => setSelectedTaskId(task.id)}>
                Show Comments
              </Button>
              {selectedTaskId === task.id && (
                <TaskComments taskId={selectedTaskId} />
              )}
            </div>
          ))}
        </div>
      ))}
    </Flex>
  )
}

const TaskComments = ({ taskId }: { taskId: string }) => {
  const { data } = useTaskCommentsQuery({ variables: { taskId } })

  console.log(data)

  return <div>hello</div>
}
