import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import s from './Cards.module.css'
import { Button } from 'antd'
import { CardsTable } from './CardsTable'
import { SearchForm } from '../../SearchForm/SearchForm'
import { cardsActions } from '../CardsBLL/cards-reducer'
import { ChangeEvent, useState } from 'react'


export const Cards = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const packName = useAppSelector((state) => state.cards.packName)
  const cardQuestion = useAppSelector((state) => state.cards.params.cardQuestion)
  const cardAnswer = useAppSelector((state) => state.cards.params.cardAnswer)
  const userId = useAppSelector((state) => state.profile.user._id)
  const { packUserId } = useParams<'packUserId'>()

  const [searchCardValue, setSearchCardValue] = useState('');

  const handleChangeSearchCardValue = (
    e: ChangeEvent<HTMLInputElement>
  ) => {

       setSearchCardValue(e.currentTarget.value)
      dispatch(cardsActions.searchQuestion(e.currentTarget.value))   
  }



  const onBackPage = () => {
    navigate(-1)
  }

  return (
    <div className={s.container}>
      <div className={s.btnBlock}>
        <Button onClick={onBackPage}>← Back to Packs List</Button>
      </div>
      <div className={s.backAndTitle}>
        <div className={s.title}>{packName}</div>
        <Button>AddCardForm</Button>
      </div>
      <div>
        <div className={s.searchFields}>
          <div>
            <SearchForm   value={searchCardValue} onChange={handleChangeSearchCardValue} />
          </div>
        </div>
        <div>{userId === packUserId && <Button>Add card</Button>}</div>
      </div>
      <div className={s.table}>
        <CardsTable />
      </div>
    </div>
  )
}
