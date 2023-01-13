import { registerAPI } from './../RegistrationAPI/registrationAPI';
import { AppThunk } from './../../../../store/store';
import { InferActionTypes } from "../../../../store/store"
import { RegisterType } from '../RegistrationAPI/registrationAPI';
import { AxiosError } from 'axios';
import { appActions } from '../../../../app/app-reducer';
import { errorUtils } from '../../../../utils/error-utils';





const registrationInitialState={
  isRegistered: false,
}

export const  registrationReducer=(state:RegistrationInitialStateType=registrationInitialState, action: RegistrationActionTypes):RegistrationInitialStateType=>{
  switch(action.type){
    case 'REGISTRATION/IS_REGISTERED':
         
          return {...state, ...action.payload}
      default:
          return state 
  }
}
export const registrationActions = {
  isRegisteredAC: (isRegistered: boolean) =>
      ({type: 'REGISTRATION/IS_REGISTERED', payload: {isRegistered}} as const), 
     }

export const signUpTC = (regData: RegisterType): AppThunk => async (dispatch) =>
{
  dispatch(appActions.setAppStatus('loading'))
  registerAPI.signUp(regData)
  .then(()=>{
    dispatch(registrationActions.isRegisteredAC(true))
  })
  .catch((error: AxiosError<{ error: string }>) => {
    errorUtils(error, dispatch)
})
.finally(() => {
    dispatch(appActions.setAppStatus('succeeded'))
})
}


export type RegistrationInitialStateType = typeof registrationInitialState
export type RegistrationActionTypes = InferActionTypes<typeof registrationActions>