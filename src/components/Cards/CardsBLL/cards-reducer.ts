
import { appActions } from "../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../store/store"
import { AxiosError } from 'axios';
import { errorUtils } from "../../../utils/error-utils"
import { cardsAPI, CardType } from "../CardsAPI/CardsAPI";


const cardsInitialState = {
  cards: [] as CardType[],
  params: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: '0grade',
    page: 1,
    pageCount: 10,
} as CardsParamsType,
cardsTotalCount: 0,
packName: '',
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType =>
{
  switch (action.type) {
    case 'CARDS/SET_CARDS':
    case 'CARDS/SET_CARDS_TOTAL_COUNT':

        return {...state, ...action.payload}
  
    default:
        return state
}
}
export const cardsActions = {
  setCards: (cards: CardType[]) => ({type: 'CARDS/SET_CARDS', payload: {cards}} as const),
  setCardsTotalCount:(cardsTotalCount:number)=>({type:'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
}



export const getCardsTC = (): AppThunk => async (dispatch, getState) =>
{
  const params = getState().packs.params


  dispatch(appActions.setAppStatus('loading'))
  try
  {
    const data = await cardsAPI.getCards(params)
    dispatch(cardsActions.setCardsTotalCount(data.cardsTotalCount))
    dispatch(cardsActions.setCards(data.cards))
  
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


export type CardsInitialStateType = typeof cardsInitialState
export type CardsActionTypes = InferActionTypes<typeof cardsActions>
export type CardsParamsType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number,
  max: number,
  sortCards: string
  page: number
  pageCount: number
}



