import { instance } from "../../../api/instance"
import {AxiosResponse} from 'axios';
import { CardsParamsType } from "../CardsBLL/cards-reducer";

export const cardsAPI = {

  getCards(params: Partial<CardsParamsType>) {
    return instance.get<any, AxiosResponse<CardsResponseType>, Partial<CardsParamsType>>('cards/card', {params}).then(res => res.data)
},
  
addCard(card: NewCardType) {
  return instance.post<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'newCard'>>, NewCardType>('cards/card', card)
},

// deleteCards() {
//   return instance.delete('cards/card', {})
// },
// updateCards() {
//   return instance.put('cards/card', {})
// },

};



type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}
export type CardType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: Date
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: Date
  user_id: string
  __v: number
  _id: string
}
export type NewCardType = {
  card: {
      cardsPack_id: string
      question?: string
      answer?: string
      grade?: number
      shots?: number
      answerImg?: string
      questionImg?: string
      questionVideo?: string
      answerVideo?: string
  }
}
export type CardResponses = {
  newCard: CardType
  deletedCard: CardType
  updatedCard: CardType
}


export type AdditionalCardResponse = {
  token: string
  tokenDeathTime: number
}

