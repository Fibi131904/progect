import { AxiosResponse } from 'axios';
import { instance } from './../../../../api/instance';

export const loginAPI = {
  async login(data: LoginType)
  {
    const response = await instance.post(`auth/login`, data);
    return response.data;
  },
  logout()
  {
    return instance.delete(`auth/me`)
  }
}

export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean
}

