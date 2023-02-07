import React, { ChangeEvent, useState } from 'react'
import cn from 'classnames'
import s from './Pagination.module.css'


type PropsType = {
  cardPacksTotalCount: number
  pageCount: number
  page: number
  onPageChanged: (pageNumber: number) => void
 }

export const Pagination: React.FC<PropsType> = (props) => {
  let pagesCount = Math.ceil(props.cardPacksTotalCount / props.pageCount)

  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / props.pageCount)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * props.pageCount + 1
  let rightPortionPageNumber = portionNumber * props.pageCount



  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          className={s.buttonPaginator}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>
          <p>
            <i className={s.arrowLeft}></i>
          </p>
        </button>
      )}

      <div className={s.paginatorNumbers}>
        {pages
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            return (
              <span
                key={p}
                className={cn(
                  { [s.selectedPage]: props.page === p },
                  s.pageNumber
                )}
                onClick={() => {
                  props.onPageChanged(p)
                }}>
                {p}
              </span>
            )
          })}
      </div>
      {portionCount > portionNumber && (
        <button
          className={s.buttonPaginator}
          onClick={() => setPortionNumber(portionNumber + 1)}>
          <p>
            <i className={s.arrowRight}></i>
          </p>
        </button>
      )}
      
    </div>
  )
}
