import { instance } from "../../../api/instance"
import { UserDataType } from "../ProfileBLL/profile-reducer";

export const profileAPI = {

  update(params: UserDataType) {
    return instance.put('auth/me', params)
},
me() {
  return instance.post('auth/me', {})
},
};
