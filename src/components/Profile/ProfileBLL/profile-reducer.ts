import { AppThunk, InferActionTypes } from "../../../store/store"
import { errorUtils } from "../../../utils/error-utils"
import { profileAPI, UserType} from "../ProfileAPI/profileAPI"
import { AxiosError } from "axios"
import { appActions } from "../../../app/app-reducer"


const profileInitialState = {
  user: {} as UserType,
}

export const profileReducer=(state: ProfileStateType= profileInitialState, action:ProfileActionTypes):ProfileStateType=>{
  switch(action.type){
    case 'profile/SET_USER_DATA':
      case 'profile/SET_IS_INITIALIZED':
      return {...state, ...action.payload}
      default:
          return state
  }

}
export const profileActions={
  setUserData: (user: UserType) => ({type: 'profile/SET_USER_DATA', payload: {user}} as const),
  setIsInitialized: (isInitialized: boolean) => ({type: 'profile/SET_IS_INITIALIZED', payload: {isInitialized}} as const)
}

export const updateProfile =  (name: string): AppThunk => async (dispatch) =>
{
  dispatch(appActions.setAppStatus('loading'))
  profileAPI.update(name)
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
