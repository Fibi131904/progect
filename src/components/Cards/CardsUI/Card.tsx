import { Button } from 'antd'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/store'
import { CardType } from '../CardsAPI/CardsAPI'

type CardPropsType = {
  card: CardType
}

export const Card: FC<CardPropsType> = ({ card }) => {
  
  const userId = useAppSelector((state) => state.profile.user._id)
  const { packUserId } = useParams<'packUserId'>()

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
      {userId === packUserId && (
        <td>
          <div>
            <Button>✎</Button>
            <Button>✘</Button>
          </div>
        </td>
      )}
    </tr>
  )
}
