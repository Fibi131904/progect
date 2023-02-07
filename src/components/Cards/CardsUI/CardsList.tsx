import { FC } from 'react'

import { CardType } from '../CardsAPI/CardsAPI'
import { Card } from './Card'


type CardsListPropsType = {
  cards: CardType[]
}

export const CardsList: FC<CardsListPropsType> = ({ cards }) => {
  
  return (
    <>
      {cards.length? cards.map((card) => (
        <Card key={card._id} card={card} />
      )): <div>PACKS NOT FOUND</div>}
    </>
  )
}
