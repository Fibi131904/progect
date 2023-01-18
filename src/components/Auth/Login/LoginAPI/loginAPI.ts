import { instance } from '../../../../api/instance';
import {AxiosResponse} from 'axios'
import { UserDataType } from '../../../Profile/ProfileBLL/profile-reducer';

export const loginAPI = {
    login(login: LoginType) {
        return instance.post<any, AxiosResponse<UserDataType>, LoginType>(`auth/login`, login)
    },
  logout()
  {
    return instance.delete(`auth/me`)
  },
  
}

export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean
}

