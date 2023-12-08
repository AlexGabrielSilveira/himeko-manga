import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Authorization": `Bearer ${token}`
    }
})