import { appActions } from "../../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../../store/store"
import { errorUtils } from "../../../../utils/error-utils"
import { createNewPasswopdAPI, NewPasswordType } from "../NewPasswordAPI/newPasswordAPI"
import {AxiosError} from 'axios';


const newPasswordInitialState = {
  isPassChanged: false,
   info:''
}

export const newPasswordReducer = (state: NewPasswordInitialStateType = newPasswordInitialState, action: NewPasswordActionTypes): NewPasswordInitialStateType => {
  switch (action.type) {
      case 'NEW_PASSWORD/SET_IS_LOADING':
      case 'NEW_PASSWORD/NEW_PASSWORD_SUCCESS':
          return {...state, ...action.payload}
      default:
          return state
  }
}
export const newPasswordActions = {
  setNewPasswordIsLoading: (isPassChanged: boolean) => ({type: 'NEW_PASSWORD/SET_IS_LOADING', payload: {isPassChanged}} as const),
  setInfoAC : (info: string) => ({type: 'NEW_PASSWORD/NEW_PASSWORD_SUCCESS',payload:{ info}} as const)
}
export const changeRassword = (newPasswordData: NewPasswordType): AppThunk => {
  return (dispatch) => {
      dispatch(appActions.setAppStatus('loading'))
      createNewPasswopdAPI.sendNewPasswopd(newPasswordData)
          .then((res) => {
              dispatch(newPasswordActions.setInfoAC(res.data.info))
              dispatch(newPasswordActions.setNewPasswordIsLoading(true))
          })
          .catch((error: AxiosError<{ error: string }>) => {
              errorUtils(error, dispatch)
          })
          .finally(() => {
              dispatch(appActions.setAppStatus('succeeded'))
          })
  }
}

export type NewPasswordInitialStateType = typeof newPasswordInitialState
export type NewPasswordActionTypes = InferActionTypes<typeof newPasswordActions>
