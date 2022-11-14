import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

function TaskForm() {
    const {
        createTask,
        formData,
        handleInputChange,
        isEditing,
        updateTask
    } = useTasksContext()

  return (
    <form onSubmit={isEditing ? updateTask : createTask}>
        <input 
            type="text" 
            placeholder='Task Name' 
            name='name' 
            value={formData.name} 
            onChange={handleInputChange} 
            autoComplete="off" 
        />
        <button>{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm