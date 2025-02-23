import axios from "axios"

const API = axios.create({
    // baseURL:"https://water-level-nine.vercel.app/api"
    baseURL:"http://192.168.0.181:3000/api"
})

export default API