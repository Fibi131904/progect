import axios from "axios"
import { appActions } from "../../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../../store/store"
import { profileActions } from "../../../Profile/ProfileBLL/profile-reducer"
import { loginAPI, LoginType } from "../LoginAPI/loginAPI"


const loginInitialState={
  isLoggedIn: false,
      error: '',
  
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

export const loginTC = (data: LoginType): AppThunk => async (dispatch )=> {
    dispatch(appActions.setAppStatus('loading'))
  try {

      let res = await loginAPI.login(data)
      if(res.data){

      dispatch(loginActions.setIsLoggedIn(true))
      dispatch(profileActions.setUserData(res.data))
      }
  } catch (e) {
      if (axios.isAxiosError(e)) {
          dispatch(loginActions.setLoginError(e.response ? e.response.data.error : e.message))
      } else {
          dispatch(loginActions.setLoginError('Some error occurred'))
      }
  } finally {
     
      dispatch(appActions.setAppStatus('succeeded'))
  }
}

export const logoutTC = (): AppThunk => async dispatch => {
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
