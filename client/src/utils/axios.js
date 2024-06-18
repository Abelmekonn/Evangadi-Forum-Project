import axios from "axios"

const axiosBase=axios.create({
    baseURL:"https://evangadi-forum-project-1-yb3r.onrender.com/api",
    // baseURL:"http://localhost:3000/api"
})

export default axiosBase;