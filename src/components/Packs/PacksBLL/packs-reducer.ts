import { CardPacksType, packsAPI } from './../PacksAPI/PacksAPI';
import { appActions } from "../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../store/store"
import { AxiosError } from 'axios';
import { errorUtils } from "../../../utils/error-utils"


const packsInitialState = {
  cardPacks: [] as CardPacksType[],
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

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionTypes): PacksInitialStateType =>
{
  switch (action.type)
  {
    case 'PACKS/SET-PACKS':

      return { ...state, ...action.payload }
    default:
      return state
  }
}
export const packsActions = {
  getPacks: (packs: CardPacksType[]) =>
    ({ type: 'PACKS/SET-PACKS', payload: { packs } } as const),

}



export const getPacksTC = (): AppThunk => async (dispatch, getState) =>
{
  const params = getState().packs.params

  dispatch(appActions.setAppStatus('loading'))
  try
  {
    const data = await packsAPI.getPacks(params)
    dispatch(packsActions.getPacks(data.data.cardPacks))
  }

  catch (error: any | AxiosError<{ error: string; }, any>)
  {
    errorUtils(error, dispatch)
  }
  finally
  {
    dispatch(appActions.setAppStatus('succeeded'))
  }
}


export type PacksInitialStateType = typeof packsInitialState
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


