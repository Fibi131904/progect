import { instance } from '../../../../api/instance';
import {AxiosResponse} from 'axios'

export const registerAPI = {
    signUp:(regData: RegisterType)=>{
    return instance.post<RegisterType, AxiosResponse<AddedUserType>>(`auth/register`, regData);
 
  }
}


export type RegisterType = {
  email: string,
  password: string
}
type AddedUserType = {
  id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  error?: string
}
