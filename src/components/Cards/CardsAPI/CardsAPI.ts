import { instance } from "../../../api/instance"
import { AxiosResponse } from 'axios';
import { CardsParamsType } from "../CardsBLL/cards-reducer";


export const cardsAPI = {

  getCards(params: CardsParamsType )
  {
    return instance.get<CardsParamsType, AxiosResponse<CardsResponseType>>('cards/card',{params})
  },

  addCard(card: NewCardType)
  {
    return instance.post('cards/card', { card })
  },

  deleteCards(id: string)
  {
    return instance.delete(`cards/card?id=${id}`)
  },
  updateCard(card: UpdateCardPayload)
  {
    return instance.put('cards/card', { card })
  },
  setCardGrade(data: UpdateGradeType)
  {
    return instance.put<UpdateGradeType, AxiosResponse<UpdatedGradeResponseType>>(`cards/grade`, data)
  }
};





type CardsResponseType = {
  cards: CardType[],
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
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
  cardsPack_id: string
  question?: string
  answer?: string
}

export type CardResponses = {
  newCard: CardType
  deletedCard: CardType
  updatedCard: CardType
}



export type UpdateCardPayload = {
  card: {
    _id: string
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    shots?: number
    user_id?: string
    created?: Date
    updated?: Date
  }
}
export type UpdatedGradeResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}

export type UpdateGradeType = {
  grade: number
  card_id: string
}

