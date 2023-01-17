import { instance } from "../../../api/instance"
import { UserType } from "../ProfileBLL/profile-reducer";
import {AxiosResponse} from 'axios'

export const profileAPI = {

  update(params: UserType) {
    return instance.put('/auth/me', params)
},
me() {
  return instance.post('/auth/me', {})
},
};
