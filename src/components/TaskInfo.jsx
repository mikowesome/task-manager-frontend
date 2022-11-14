import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

function TaskInfo() {
    const { tasks } = useTasksContext()

    const completedTasks = tasks.filter(tasks => tasks.completed === true).length

  return (
    <div className='task-info'>
        <h3>Total Tasks: {tasks.length}</h3>
        <h3>Completed Tasks: {completedTasks}</h3>
    </div>
  )
}

export default TaskInfo