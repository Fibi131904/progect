import staticMethods from "antd/es/message"
import { appActions } from "../../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../../store/store"
import { errorUtils } from "../../../../utils/error-utils"
import { recoverAPI } from "../RecoveryAPI/recoveryAPI"
import {AxiosError} from 'axios';

const recoveryInitialState={
info: ''
}
export const recoveryReducer=(state:RecoveryInitialStateType= recoveryInitialState, action:RecoveryActionTypes):RecoveryInitialStateType=>{
  switch(action.type){
    case 'RECOVERY/CONFIRM_STATUS':
      return{...staticMethods, ...action.payload}
      default:
        return state
  }
}
export const recoveryActions={
recoverAC:(info:string)=>({type:'RECOVERY/CONFIRM_STATUS', payload: {info}}as const)
}
export const recoverTC = (email: string, message: string): AppThunk => {
  return (dispatch) => {
      dispatch(appActions.setAppStatus('loading'))
      recoverAPI.sendEmail(email, message)
          .then((res) => {
              dispatch(recoveryActions.recoverAC(res.data.info))
          })
          .catch((error: AxiosError<{ error: string }>) => {
              errorUtils(error, dispatch)
          })
          .finally(() => {
              dispatch(appActions.setAppStatus('succeeded'))
          })
  }
}

export type RecoveryInitialStateType = typeof recoveryInitialState
export type RecoveryActionTypes = InferActionTypes<typeof recoveryActions>
