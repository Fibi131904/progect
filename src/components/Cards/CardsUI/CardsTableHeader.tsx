import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { packsActions, SortOrderType } from '../../Packs/PacksBLL/packs-reducer'
import s from '../../Packs/PacksUI/PacksTable/table.module.css'
import { cardsActions } from '../CardsBLL/cards-reducer'

type  CardsTableHeaderType={
param: CardsSortFieldsType
text: string
}
export type CardsSortFieldsType = 'answer' | 'question' | 'updated' | 'grade'

export const CardsTableHeader = ({text, param}:CardsTableHeaderType) => {
  const dispatch = useAppDispatch()
  const [sortOrder, setSortOrder]=useState<SortOrderType>('0')  
  const [sortField, setSortField] = useState<CardsSortFieldsType>('updated')

  const changeSortField = (fieldToSort: CardsSortFieldsType) => {
    setSortField(fieldToSort)
    // dispatch(cardsActions.setSortParameters(sortOrder + fieldToSort))
}

const changeSortOrder = (order: SortOrderType) => {
    setSortOrder(order)
    dispatch(packsActions.setSortParameters(order + sortField))
}
  return  <th>
              <div>
              <div onClick={() => changeSortField(param)}>{text}</div>
                <div className={s.triangle}>
                <div onClick={() => changeSortOrder('0')}>▲</div>
                <div onClick={() => changeSortOrder('1')}>▼</div>
                </div>
              </div>
            </th>
 }
