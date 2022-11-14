import axios from 'axios'

export default axios.create({
    baseURL: "https://mikowesome-task-manager-api.onrender.com/api/v1/tasks"
})