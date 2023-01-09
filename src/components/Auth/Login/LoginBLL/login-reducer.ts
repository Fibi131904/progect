import axios from "axios"
import { AppThunk, InferActionTypes } from "../../../../store/store"
import { loginAPI, LoginType } from "./loginAPI"

const loginInitialState={
  isLoggedIn: false,
    error: '',
    isLoading: false
}

export const loginReducer=(state:LoginInitialStateType=loginInitialState, action: LoginActionsType):LoginInitialStateType=>{
  switch(action.type){
    case 'LOGIN/SET-IS-LOGGED-IN':
      case 'LOGIN/SET-ERROR':
      case 'LOGIN/SET-LOGIN':
          return {...state, ...action.payload}
      default:
          return state 
  }
}
export const loginActions = {
  setIsLoggedIn: (isLoggedIn: boolean) =>
      ({type: 'LOGIN/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const),
  setLoginError: (error: string) =>
      ({type: 'LOGIN/SET-ERROR', payload: {error}} as const),
  setIsLoading: (isLoading: boolean) =>
      ({type: 'LOGIN/SET-LOGIN', payload: {isLoading}} as const),
}

export const login = (data: LoginType): AppThunk => async dispatch => {
  dispatch(loginActions.setIsLoading(true))
  try {
      const res = await loginAPI.login(email, password, rememberMe?)
   
      dispatch(loginActions.setIsLoggedIn(true))
    
  } catch (e) {
      if (axios.isAxiosError(e)) {
          dispatch(loginActions.setLoginError(e.response ? e.response.data.error : e.message))
      } else {
          dispatch(loginActions.setLoginError('Some error occurred'))
      }
  } finally {
      dispatch(loginActions.setIsLoading(false))
  }
}

export const logout = (): AppThunk => async dispatch => {
  try {
      await loginAPI.logout()
      dispatch(loginActions.setLoginError(''))
   
  } catch (e) {
      if (axios.isAxiosError(e)) {
          dispatch(loginActions.setLoginError(e.response ? e.response.data.error : e.message))
      } else {
          dispatch(loginActions.setLoginError('Some error occurred'))
      }
  }
}



export type LoginInitialStateType=typeof loginInitialState
export type LoginActionsType = InferActionTypes<typeof loginActions>
