import {AxiosResponse} from 'axios'
import { instance } from '../../../../api/instance'


export const recoverAPI = {
    sendEmail: (email: string, message: string) => {
        return instance.post<{ email: string, message: string }, AxiosResponse<ResponseType>>('/auth/forgot', {
            email,
            message
        })
    }
}


type ResponseType = {
    info: string
    error: string
}