import { AppThunk, InferActionTypes } from "../../../store/store"
import { errorUtils } from "../../../utils/error-utils"
import { profileAPI} from "../ProfileAPI/profileAPI"
import { AxiosError } from "axios"
import { appActions } from "../../../app/app-reducer"


const profileInitialState = {
  _id: '',
    name: 'Enter your name',
    avatar: '',
    publicCardPacksCount: 0,
    email: ''
}

export const profileReducer=(state:  UserDataType= profileInitialState, action:ProfileActionTypes):ProfileStateType=>{
  switch(action.type){
    case 'profile/SET_USER_DATA':
      case 'profile/SET_IS_INITIALIZED':
      return {...state, ...action.payload}
      default:
          return state
  }

}
export const profileActions={
  setUserData: (user: UserDataType) => ({type: 'profile/SET_USER_DATA', payload: {user}} as const),
  setIsInitialized: (isInitialized: boolean) => ({type: 'profile/SET_IS_INITIALIZED', payload: {isInitialized}} as const)
}

export const updateUserDataTC = (userData: UserDataType): AppThunk => async (dispatch) =>
{
  dispatch(appActions.setAppStatus('loading'))
  profileAPI.update(userData)
      .then((res) => {
          dispatch(profileActions.setUserData(res.data.updatedUser))
      })
      .catch((error: AxiosError<{ error: string }>) => {
          errorUtils(error, dispatch)
      })
      .finally(() => {
          dispatch(appActions.setAppStatus('succeeded'))
      })
}
export const authMe = ():AppThunk=>(dispatch)=>{
  dispatch(appActions.setAppStatus('loading'))
  profileAPI.me()
  
  .then((res)=>{

 console.log(res.data)
      dispatch(appActions.setAppIsLoading(true))
      dispatch(profileActions.setUserData(res.data))

  })
  .finally(() => {
      dispatch(appActions.setInitialized(true))
      dispatch(appActions.setAppStatus('succeeded'))
  })
}


export type ProfileStateType = typeof profileInitialState
export type ProfileActionTypes = InferActionTypes<typeof profileActions>

export type UserDataType = {
  _id: string
  email: string
  rememberMe?: boolean
  isAdmin?: boolean
  name: string
  verified?: boolean
  publicCardPacksCount: number
  created?: Date
  updated?: Date
  __v?: number
  token?: string
  tokenDeathTime?: number
  avatar: string
}
