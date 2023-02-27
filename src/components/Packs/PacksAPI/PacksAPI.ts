import { instance } from "../../../api/instance"
import {AxiosResponse} from 'axios';

export const packsAPI = {
  getPacks(params: RequestGetPacksType) {
    return instance.get<RequestGetPacksType, AxiosResponse<ResponseCardPacksType>>('/cards/pack', {params}).then(res=> res.data);
},
addPack(cardsPack:AddNewCardType) {
  return instance.post('/cards/pack', cardsPack)
},
deletePack( id: string) {
  return instance.delete(`cards/pack?id=${id}`)
},
updatePack(cardsPack: UpdatePackType) {
  return instance.put('cards/pack', cardsPack)
},

};

export type RequestGetPacksType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  pageCount?: number
  page?: number
  user_id?: string
}

type ResponseCardPacksType = {
  cardPacks: CardPacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}


export type CardPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type AddNewCardType = {
  cardsPack: {
      name: string,
      deckCover?: string,
      private: boolean
  }
}
export type UpdatePackType = {
  cardsPack: {
      _id: string
      user_id?: string
      user_name?: string
      private?: boolean
      name?: string
      path?: string
      grade?: number
      shots?: number
      cardsCount?: number
      type?: string
      rating?: number
      created?: Date
      updated?: Date
      more_id?: string
      __v?: number
      deckCover?: null | string
  }
}
