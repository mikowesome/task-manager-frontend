import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import Task from './Task'

function TaskList() {
    const { tasks } = useTasksContext()

  return (
    <>
        {
            tasks && tasks.length > 0 ? (
                <div className={tasks.length === 1 ? 'flex-center-container' : 'tasks-container'}>
                {
                    tasks.map(task => <Task key={task._id} task={task} />)
                }
                </div>
            ) : (
                <div className='flex-center-container'>
                    <p>No tasks added. Please add a task.</p>
                </div>
            )
        }
    </>
  )
}

export default TaskList