import { Button } from 'antd'
import { FC } from 'react'
import { CardType } from '../CardsAPI/CardsAPI'

type CardPropsType = {
  card: CardType
}

export const Card: FC<CardPropsType> = ({ card }) => {
  const formatDate = (date: Date | string | number) => {
    return (
      new Date(date).toLocaleDateString('ru-RU') +
      ' ' +
      new Date(date).toLocaleTimeString()
    )
  }

  return (
    <tr>
      <td>{card.question}</td>
      <td>{card.answer}</td>
      <td>{formatDate(card.updated)}</td>
      <td>{card.grade.toFixed(2)}</td>
    </tr>
  )
}
