import axios from "axios"
import { apiUrl } from "../../contexts/constaints"

export const getOwner = async (name: string) => {
    try {
        const response = await axios.post(apiUrl + 'users/searchUserByName', {name})
        if(response.data.success)
            return response.data
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}