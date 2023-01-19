import { instance } from "../../../api/instance"
import {AxiosResponse} from 'axios';

export const packsAPI = {

  getPacks(params?: RequestGetPacksType) {
    return instance.get<RequestGetPacksType, AxiosResponse<ResponseGetPacksType>>('cards/pack', {params})
},

addPacks() {
  return instance.post('cards/pack', {})
},
deletePacks() {
  return instance.delete('cards/pack', {})
},
updatePack() {
  return instance.put('cards/pack', {})
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
export type PackType = {
  _id: string,
  user_id: string,
  user_name: string,
  private: boolean,
  name: string,
  path: string,
  grade: number,
  shots: number,
  cardsCount: number,
  type: string,
  rating: number,
  created: string,
  updated: string,
  more_id: string,
  __v: number,
  deckCover: string
}

export type ResponseGetPacksType = {
  cardPacks: PackType[]
  page: number,
  pageCount: number,
  cardPacksTotalCount: number,
  minCardsCount: number,
  maxCardsCount: number,
  sortPacks: string,
}