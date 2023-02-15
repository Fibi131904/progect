import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { CardType } from '../Cards/CardsAPI/CardsAPI'
import { getCardsTC } from '../Cards/CardsBLL/cards-reducer'

export const LearnPage = () => {
  const { cards } = useAppSelector((state) => state.cards)
  const { packId, packName } = useParams<'packId' | 'packName'>()
  const dispatch = useAppDispatch()
  const [first, setFirst] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
  })

  const getCard = (cards: CardType[]) => {
    const sum = cards.reduce(
      (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
      0
    )
    const rand = Math.random() * sum
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
        return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 }
    )
    return cards[res.id + 1]
  }

  useEffect(() => {
    if (first) {
      packId && dispatch(getCardsTC(packId))
      setFirst(false)
    }

    if (cards.length > 0) setCard(getCard(cards))
  }, [dispatch, packId, cards, first])

  const onNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }

  return (
    <div>
      <div>Learn{packName}</div>
      <div>
        <span>Question: </span>
        {card.question}
      </div>

      <div>
        <span>Answer: </span>
        {card.answer}
      </div>
      <div>
        <Radio.Group size="small">
          <NavLink to={'/packs'}>
            <Radio.Button>Done</Radio.Button>
          </NavLink>
          <Radio.Button onClick={onNext}> Next Question</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}
