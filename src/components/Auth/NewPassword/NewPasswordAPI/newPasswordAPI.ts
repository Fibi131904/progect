import { AxiosResponse } from "axios"
import { instance } from "../../../../api/instance"



export const createNewPasswopdAPI = {
  sendNewPasswopd(newPasswordData: NewPasswordType)
  {
    return instance.post<NewPasswordType, AxiosResponse<ResponseType>>(`auth/set-new-password`, newPasswordData)
  }
}

export type NewPasswordType = {
  password: string
  resetPasswordToken: string
}
type ResponseType = {
  info: string
  error: string;
}