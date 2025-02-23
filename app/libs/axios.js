import axios from "axios"

const API = axios.create({
    //production
    baseURL:"https://water-level-nine.vercel.app/api"
    //Development
    // baseURL:"http://192.168.0.181:3000/api"
})

export default API