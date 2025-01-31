import { getSecuredItemAsync } from '@/utils/storage'
import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://loan-calculator-backend-1uux.onrender.com/api/',
})

axiosClient.interceptors.request.use( async (config) =>{
    const token  = await getSecuredItemAsync('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
})
export default axiosClient 