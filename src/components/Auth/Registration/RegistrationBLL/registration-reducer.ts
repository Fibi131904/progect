import { registerAPI } from './../RegistrationAPI/registrationAPI';
import { AppThunk } from './../../../../store/store';
import { InferActionTypes } from "../../../../store/store"
import { RegisterType } from '../RegistrationAPI/registrationAPI';
import { AxiosError } from 'axios';





const registrationInitialState={
  isRegistered: false,
  isLoading: false,
  error: '',   
}

export const  registrationReducer=(state:RegistrationInitialStateType=registrationInitialState, action: RegistrationActionTypes):RegistrationInitialStateType=>{
  switch(action.type){
    case 'REGISTRATION/IS_REGISTERED':
      case 'REGISTRATION/SET_IS_LOADING':
        case 'REGISTRATION/SET_ERROR':
   
          return {...state, ...action.payload}
      default:
          return state 
  }
}
export const registrationActions = {
  isRegisteredAC: (isRegistered: boolean) =>
      ({type: 'REGISTRATION/IS_REGISTERED', payload: {isRegistered}} as const), 
      setRegistrationIsLoading: (isLoading: boolean) => ({type: 'REGISTRATION/SET_IS_LOADING', payload: {isLoading}} as const),
      setRegistrationError: (error: string) => ({type: 'REGISTRATION/SET_ERROR', payload: {error}} as const)
}

export const signUp = (regData: RegisterType): AppThunk => async (dispatch) =>
{
  dispatch(registrationActions.setRegistrationIsLoading(true))
  dispatch(registrationActions.setRegistrationError(''))

  try
  {
    const res = await registerAPI.signUp(regData)
    if (res.data)
    {
      dispatch(registrationActions.isRegisteredAC(true))
    }
  }
  catch(error: any | AxiosError<{ error: string; }, any>)
  {
    dispatch(registrationActions.setRegistrationError('Some error occurred'))
  }
  finally {
    dispatch(registrationActions.setRegistrationIsLoading(false))
}
}

export type RegistrationInitialStateType = typeof registrationInitialState
export type RegistrationActionTypes = InferActionTypes<typeof registrationActions>