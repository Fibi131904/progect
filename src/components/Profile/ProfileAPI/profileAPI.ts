import { instance } from "../../../api/instance"
import {AxiosResponse} from 'axios'
import { UserDataType } from "../ProfileBLL/profile-reducer";

export const profileAPI = {
  me() {
      return instance.post<any, AxiosResponse<ResponseType>, {}>('auth/me', {})
  },
  update(params: UserDataType) {
    return instance.put('/auth/me', params)
},
};
