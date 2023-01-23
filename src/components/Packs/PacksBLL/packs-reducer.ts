import { packsAPI } from './../PacksAPI/PacksAPI';
import { appActions } from "../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../store/store"
import { PackType } from "../PacksAPI/PacksAPI"
import {AxiosError} from 'axios';
import { errorUtils } from "../../../utils/error-utils"


const packsInitialState={
  cardPacks: [] as PackType[],
  params: {
    packName: '',
    min: 0,
    max: 103,
    sortPacks: '0updated',
    page: 1,
    pageCount: 10,
    user_id: '',
} as PacksParamsType,
  
}

export const packsReducer=(state:PacksInitialStateType=packsInitialState, action: PacksActionTypes):PacksInitialStateType=>{
  switch(action.type){
    case 'PACKS/SET-PACKS':
    
          return {...state, ...action.payload}
      default:
          return state 
  }
}
export const packsActions = {
  getPacks: (packs: PackType[]) =>
      ({type: 'PACKS/SET-PACKS', payload: {packs}} as const),
 
}

 

export const getPacksTC = (): AppThunk => (dispatch, getState) => {
 const params=getState().packs.params
    dispatch(appActions.setAppStatus('loading'))
  packsAPI.getPacks(params)
        .then((res) => {
            dispatch(packsActions.getPacks(res.data.cardPacks))
        console.log(res.data.cardPacks)
           
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(appActions.setAppStatus('succeeded'))
        })
}





export type PacksInitialStateType=typeof packsInitialState
export type PacksActionTypes = InferActionTypes<typeof packsActions>
export type PacksParamsType = {
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id: string
}


