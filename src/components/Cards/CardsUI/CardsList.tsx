import { FC } from 'react'
import { useAppSelector } from '../../../store/store'
import { CardType } from '../CardsAPI/CardsAPI'
import { Card } from './Card'

type CardsListPropsType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListPropsType> = ({ cards }) => {
  const status = useAppSelector((state) => state.app.status)
  return (
    <>
     {cards.length ? status !== 'loading' && cards?.map((card)  => (
        <Card key={card._id} card={card} />
      )) : status !== 'loading' && <div>NO CARDS FOUND</div>}
    </>
  )
}
