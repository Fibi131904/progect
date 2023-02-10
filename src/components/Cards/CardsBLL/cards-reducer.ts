import { appActions } from "../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../store/store"
import { AxiosError } from 'axios';
import { errorUtils } from "../../../utils/error-utils"
import { cardsAPI, CardType, NewCardType } from "../CardsAPI/CardsAPI";


const cardsInitialState = {
  cards: [] as CardType[],
  card: {} as CardType,
  packUserId: '',
  params: {
      page: 1,
      pageCount: 10,
      cardsTotalCount: 0,
      cardQuestion: '',
      cardAnswer: '',
  },
  minGrade: 0,
  maxGrade: 6,
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType =>
{
  switch (action.type) {
    case 'CARDS/GET_CARDS':
      case 'CARDS/SET-PACK-USER-ID':
      case 'CARDS/SET-PAGE':
      case 'CARDS/SET-PAGE-COUNT':
      case 'CARDS/SET-CARDS-TOTAL-COUNT':

        return {...state, ...action.payload}
 
    default:
        return state
}
}
export const cardsActions = {
  getCards: (cards: CardType[]) => ({type: 'CARDS/GET_CARDS', payload: {cards}} as const),
  setPackUserId: (packUserId: string) => ({type: 'CARDS/SET-PACK-USER-ID',  payload: {packUserId}} as const),
  setCardsPage: (page: number) => ({type: 'CARDS/SET-PAGE', payload: { page},} as const),
setCardsPageCount :(pageCount: number) => ({type: 'CARDS/SET-PAGE-COUNT',  payload: {pageCount},} as const),
setCardsTotalCount :(cardsTotalCount: number) => ({
    type: 'CARDS/SET-CARDS-TOTAL-COUNT', payload: 
    {cardsTotalCount},
} as const)
  
}



export const getCardsTC = (cardsPack_id: string): AppThunk => {
  return (dispatch, getState) =>{
  const {params} = getState().cards
  dispatch(appActions.setAppStatus('loading'))
 cardsAPI.getCards(cardsPack_id, params)
.then((res)=>{
   console.log(res.data.cards)
     dispatch(cardsActions.getCards(res.data.cards))
     dispatch(cardsActions.setPackUserId(res.data.packUserId))
     dispatch(cardsActions.setCardsPage(res.data.page))
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

export const addCardTC = (newCard: NewCardType): AppThunk =>(dispatch) => {
   dispatch(appActions.setAppStatus('loading'))
cardsAPI.addCard(newCard)
.then((res)=>{
   
     dispatch(getCardsTC(newCard.cardsPack_id))
   
  } )
  .catch( (error: any | AxiosError<{ error: string; }, any>)=>
  {
    errorUtils(error, dispatch)
  })
  .finally(()=>
  {
    dispatch(appActions.setAppStatus('succeeded'))
  })
}


export type CardsInitialStateType = typeof cardsInitialState
export type CardsActionTypes = InferActionTypes<typeof cardsActions>




