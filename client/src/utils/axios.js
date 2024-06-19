import axios from "axios"

const axiosBase=axios.create({
    baseURL:"https://evangadi-forum-project-1-yb3r.onrender.com/api",
    // baseURL:"http://localhost:3306/api",
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosBase;