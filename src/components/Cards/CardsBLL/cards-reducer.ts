import { appActions } from "../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../store/store"
import { AxiosError } from 'axios';
import { errorUtils } from "../../../utils/error-utils"
import { cardsAPI, CardType, NewCardType } from "../CardsAPI/CardsAPI";


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
    case 'CARDS/SET_PACK_NAME':
        return {...state, ...action.payload}
    case 'CARDS/SET_CURRENT_PAGE':
    case 'CARDS/SET_SEARCH_QUESTION':
    case 'CARDS/SET_SEARCH-ANSWER':
     case 'CARDS/SET_SORT_PARAMETERS':
    case 'CARDS/SET_PACK_ID':
    case 'CARDS/SET_CARDS_PAGE_COUNT':
        return {...state, params: {...state.params, ...action.payload}}
    default:
        return state
}
}

export const cardsActions = {
  setCards: (cards: CardType[]) => ({type: 'CARDS/SET_CARDS', payload: {cards}} as const),
  setCardsTotalCount: (cardsTotalCount: number) =>
      ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
  setCurrentPage: (page: number) => ({type: 'CARDS/SET_CURRENT_PAGE', payload: {page}} as const),
  searchQuestion: (cardQuestion: string) => ({type: 'CARDS/SET_SEARCH_QUESTION', payload: {cardQuestion}} as const),
  searchAnswer: (cardAnswer: string) => ({type: 'CARDS/SET_SEARCH-ANSWER', payload: {cardAnswer}} as const),

  setSortParameters: (sortCards: string) => ({type: 'CARDS/SET_SORT_PARAMETERS', payload: {sortCards}} as const),
  setPackId: (cardsPack_id: string) => ({type: 'CARDS/SET_PACK_ID', payload: {cardsPack_id}} as const),
  setPackName: (packName: string) => ({type: 'CARDS/SET_PACK_NAME', payload: {packName}} as const),
  setCardsPageCount: (pageCount: number) => ({type: 'CARDS/SET_CARDS_PAGE_COUNT', payload: {pageCount}} as const),
}



export const getCardsTC = (cardsPack_id: string): AppThunk => {
  return (dispatch, getState) =>{
  const params = getState().cards.params
  dispatch(appActions.setAppStatus('loading'))
 cardsAPI.getCards(params)
.then((res)=>{
  
     dispatch(cardsActions.setCards(res.data.cards))
     dispatch(cardsActions.setCardsPageCount(res.data.pageCount))
     dispatch(cardsActions.setCardsTotalCount(res.data.cardsTotalCount))
       
  })

  .catch( (error: any | AxiosError<{ error: string; }, any>)=>
  {
    errorUtils(error, dispatch)
  })
  .finally(()=>
  {
    dispatch(appActions.setAppStatus('succeeded'))
  })
}}

export const addCardTC = (newCard: NewCardType): AppThunk => async (dispatch) => {
   dispatch(appActions.setAppStatus('loading'))
   try {
await cardsAPI.addCard(newCard)
await dispatch(getCardsTC(newCard.cardsPack_id))
   
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


