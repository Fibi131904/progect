import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { Pagination } from '../../../Pagination/Pagination'
import { getPacksTC, packsActions } from '../../PacksBLL/packs-reducer'
import { PacksList } from '../PackList/PacksList'
import { TableHeader } from './TableHeader'
import s from './table.module.css'


export const PacksTable = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector((state) => state.packs.cardPacks)
  const packName = useAppSelector((state) => state.packs.params.packName)
  const user_id = useAppSelector((state) => state.packs.params.user_id)
  const sortPacks = useAppSelector((state) => state.packs.params.sortPacks)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  )
  const page = useAppSelector((state) => state.packs.params.page)
  const pageCount = useAppSelector((state) => state.packs.params.pageCount)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [dispatch, packName, user_id, sortPacks, min, max, pageCount])

  const onPageChanged = (page: number) => {
    dispatch(packsActions.setCurrentPage(page))
    dispatch(getPacksTC())
  }

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead className={s.tableThead}>
          <tr>
            <TableHeader text={'Name'} param={'name'} />
            <TableHeader text={'Cards'} param={'cardsCount'} />
            <TableHeader text={'Updated'} param={'updated'} />
            <TableHeader text={'Creator'} param={'user_name'} />
             <th>Actions</th>
          </tr>
         
        </thead>

        <tbody>
          <PacksList cardPacks={cardPacks} />
        </tbody>
      </table>

      <Pagination
        pageCount={pageCount}
        itemsPacksTotalCount={cardPacksTotalCount}
        page={page}
        onPageChanged={onPageChanged}
      />
    </div>
  )
}
