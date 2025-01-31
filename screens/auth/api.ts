import { EUser } from "./Register";
import client from '../../lib/axios'

export const registerUser = async (data: EUser) => {
    const response = await client.post('users/register', data)
    return response.data
}

export const loginUser= async (data: {email: string, password: string}) => {
    const response = await client.post('login', data)
    return response.data
}