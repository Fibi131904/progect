import { instance } from "../../../api/instance"
import { UserDataType } from "../ProfileBLL/profile-reducer";
import {AxiosResponse} from 'axios'

export const profileAPI = {

  update(name: string) {
    return instance.put<any, AxiosResponse<ResponseUpdateType>, {name: string}>('auth/me', {name})
},
me() {
  return instance.post('auth/me', {})
},
};

type ResponseUpdateType = {
  updatedUser: UserType
}

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
}