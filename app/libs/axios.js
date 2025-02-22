import axios from "axios"

const API = axios.create({
    baseURL:"https://water-level-nine.vercel.app/api"
})

export default API