import { instance } from '../../../../api/instance';

export const registerAPI = {
  async signUp(regData: RegisterType)
  {
    const response = await instance.post(`auth/register`, regData);
    return response.data;
  },

}

export type RegisterType = {
  email: string,
  password: string
}

