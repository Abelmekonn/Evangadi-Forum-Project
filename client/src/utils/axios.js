import axios from "axios"

const axiosBase=axios.create({
    baseURL:"https://forum-backend-dfco.onrender.com/api"
})

export default axiosBase;