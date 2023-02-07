import { instance } from "../../../api/instance"
import {AxiosResponse} from 'axios';

export const cardsAPI = {

  getCards(params: RequestGetCardsType) {
    return instance.get<RequestGetCardsType, AxiosResponse<ResponseCardType>>('/cards/card', {params}).then(res=>res.data);
},

addCards() {
  return instance.post('cards/card', {})
},
deleteCards() {
  return instance.delete('cards/card', {})
},
updateCards() {
  return instance.put('cards/card', {})
},

};

export type RequestGetCardsType = {
  

}

type ResponseCardType = {
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




