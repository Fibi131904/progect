import React, { useState } from 'react'
import { useAppDispatch } from '../../../../store/store'
import { packsActions, PacksSortFieldsType, SortOrderType } from '../../PacksBLL/packs-reducer'
import s from './table.module.css'

type  TableHeaderType={
param: PacksSortFieldsType
text: string
}

export const TableHeader = ({text, param}:TableHeaderType) => {
  const dispatch = useAppDispatch()
  const [sortOrder, setSortOrder]=useState<SortOrderType>('0')  
  const [sortField, setSortField] = useState<PacksSortFieldsType>('updated')

  const changeSortField = (fieldToSort: PacksSortFieldsType) => {
    setSortField(fieldToSort)
    dispatch(packsActions.setSortParameters(sortOrder + fieldToSort))
}

const changeSortOrder = (order: SortOrderType) => {
    setSortOrder(order)
    dispatch(packsActions.setSortParameters(order + sortField))
}
  return (
   
                  <th>
              <div>
                <div >{text}</div>
                <div className={s.triangle}>
                <div onClick={() => changeSortOrder('0')}>▲</div>
                <div onClick={() => changeSortOrder('1')}>▼</div>
                </div>
              </div>
            </th>
        
            
             
   
  )
}
