import { useAppDispatch, useAppSelector } from '../../../store/store'
import { CardsTableHeader } from './CardsTableHeader'
import { useParams } from 'react-router-dom'
import { CardsList } from './CardsList'
import { useEffect } from 'react'
import s from './CardsTable.module.css'
import { cardsActions, getCardsTC } from '../CardsBLL/cards-reducer'
import { Pagination } from '../../Pagination/Pagination'

export const CardsTable = () => {
  const dispatch = useAppDispatch()
  const { packUserId } = useParams<'packUserId'>()

  const userId = useAppSelector((state) => state.profile.user._id)
  const page = useAppSelector((state) => state.cards.params.page)
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
  const cards = useAppSelector((state) => state.cards.cards)
  const cardQuestion = useAppSelector(
    (state) => state.cards.params.cardQuestion
  )
  const cardAnswer = useAppSelector((state) => state.cards.params.cardAnswer)
  const pageCount = useAppSelector((state) => state.cards.params.pageCount)
  const sortCards = useAppSelector((state) => state.cards.params.sortCards)
  const { packId, packName } = useParams<'packId' | 'packName'>()

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [dispatch, cardQuestion, cardAnswer, pageCount, sortCards])

  const onPageChanged = (page: number) => {
    dispatch(cardsActions.setCurrentPage(page))
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <CardsTableHeader text={'Question'} param={'question'} />
            <CardsTableHeader text={'Answer'} param={'answer'} />
            <CardsTableHeader text={'Updated'} param={'updated'} />
            <CardsTableHeader text={'Grade'} param={'grade'} />
            {userId === packUserId && (
              <th>
                <span>Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <CardsList cards={cards} />
        </tbody>
      </table>
      <div>
        <Pagination
          pageCount={pageCount}
          itemsPacksTotalCount={cardsTotalCount}
          page={page}
          onPageChanged={onPageChanged}
        />
      </div>
    </div>
  )
}
