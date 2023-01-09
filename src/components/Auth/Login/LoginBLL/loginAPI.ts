import { instance } from './../../../../api/instance';

export const loginAPI={
async login(email: string, password: string,
  rememberMe: boolean = false) {
 const response = await instance.post<LoginType>(`auth/login`, { email,
      password, rememberMe });
 return response.data;
},
logout() {
 return instance.delete(`auth/me`)
}
}

export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean
}

