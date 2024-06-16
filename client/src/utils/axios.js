import axios from "axios"

const axiosBase=axios.create({
    // baseURL:"https://forum-backend-dfco.onrender.com/api",
    baseURL:"http://localhost:3000/api"
})

export default axiosBase;