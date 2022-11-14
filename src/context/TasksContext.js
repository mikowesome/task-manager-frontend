import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import TaskManager from "../apis/TaskManager";

export const TasksContext = createContext()

export const TasksContextProvider = ({children}) => {
    const [formData, setFormData] = useState({
        name: '',
        completed: false
    })
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState("")

    async function createTask(event) {
        event.preventDefault()
        if (formData.name === "") {
            return toast.error("Input field cannot be empty")
        }
        setIsLoading(true)
        try {
            const response = await TaskManager.post("/", formData)
            setFormData({name: ""})
            setTasks(prevTasks => [...prevTasks, response.data])
            setIsLoading(false)
            toast.success("Task added successfully")
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    function handleInputChange(event) {
        setFormData(prevFormData => {
            const {name, value} = event.target
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function completeTask(id, completed) {
        setIsLoading(true)
        try {
            await TaskManager.put(`/${id}`, {completed: !completed})
            setTasks(prevTasks => prevTasks.map(task => {
                if (task._id === id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                } else {
                    return task
                }
            }))
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
    }

    function editTask(task) {
        setFormData({
            name: task.name,
            completed: false
        })
        setTaskID(task._id)
        setIsEditing(true)
    }

    async function updateTask(event) {
        event.preventDefault()
        if (formData.name === "") {
            return toast.error("Input field cannot be empty")
        }
        try {
            const response = await TaskManager.put(`/${taskID}`, formData)
            setFormData({...formData, name: ""})
            setIsEditing(false)
            setTasks(prevTasks => prevTasks.map(task => {
                if (task._id === taskID) {
                    return {
                        ...task,
                        name: response.data.name,
                        completed: response.data.completed
                    }
                } else {
                    return task
                }
            }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function deleteTask(id) {
        setIsLoading(true)
        try {
            await TaskManager.delete(`/${id}`)
            setTasks(tasks.filter(task => task._id !== id))
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            setIsLoading(true)
            try {
                const response = await TaskManager.get("/")
                setTasks(response.data)
                setIsLoading(false)
            } catch (error) {
                toast.error(error.message)
                setIsLoading(false)
            }
        }
        fetchTasks()
    }, [])

    return (
        <TasksContext.Provider value={{
            formData,
            createTask,
            handleInputChange,
            tasks,
            completeTask,
            editTask,
            deleteTask,
            isLoading,
            isEditing,
            updateTask
        }}>
            {children}
        </TasksContext.Provider>
    )
}