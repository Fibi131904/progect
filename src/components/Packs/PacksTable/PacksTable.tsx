import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { Pagination } from '../../Pagination/Pagination'
import { getPacksTC, packsActions } from '../PacksBLL/packs-reducer'
import { PacksList } from './PacksUI/PackList/PacksList'
import s from './PacksUI/PacksTable/table.module.css'

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
            <th>
              <div>
                <div >Name</div>
                <div className={s.triangle}>
                  <div>▲</div>
                  <div>▼</div>
                </div>
              </div>
            </th>
            <th>
              <div>
                <div>Cards</div>
                <div className={s.triangle}>
                  <div>▲</div>
                  <div>▼</div>
                </div>
              </div>
            </th>
            <th>
              <div>
                <div>Updated</div>
                <div className={s.triangle}>
                  <div>▲</div>
                  <div>▼</div>
                </div>
              </div>
            </th>
            <th>
              <div>
                <div>Creator</div>
                <div className={s.triangle}>
                  <div>▲</div>
                  <div>▼</div>
                </div>
              </div>
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <PacksList cardPacks={cardPacks} />
         
        </tbody>
      </table>
      <div>
                <Pagination
                  pageCount={pageCount}
                  cardPacksTotalCount={cardPacksTotalCount}
                  page={page}
                  onPageChanged={onPageChanged}
                />
              </div>
    </div>
  )
}
