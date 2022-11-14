import React from 'react'
import { FaEdit, FaCheck, FaTrashAlt, FaTimes } from 'react-icons/fa'
import { useTasksContext } from '../hooks/useTasksContext'

function Task({task}) {
    const {
        completeTask,
        editTask,
        deleteTask
    } = useTasksContext()
  return (
    <div className='task-card'>
        <div className={`task-status ${task.completed ? 'done' : 'pending'}`}></div>
        <div className='task-details'>
            <h4>{task.name}</h4>
            <div className='task-options'>
                {task.completed ? (
                    <FaTimes 
                        style={{color: 'red', cursor: 'pointer'}}
                        onClick={() => completeTask(task._id, task.completed)}
                    />
                ) : (
                    <FaCheck 
                        style={{color: 'green', cursor: 'pointer'}}
                        onClick={() => completeTask(task._id, task.completed)} 
                    />
                )}
                <FaEdit 
                    style={{color: 'purple', cursor: 'pointer'}}
                    onClick={() => editTask(task)} 
                />
                <FaTrashAlt 
                    style={{color: 'red', cursor: 'pointer'}}
                    onClick={() => deleteTask(task._id)} 
                />
            </div>
        </div>
    </div>
  )
}

export default Task