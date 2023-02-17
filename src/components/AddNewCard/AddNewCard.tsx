import React, { FC, useState } from 'react'
import s from './AddNewCard.module.css'
import { Button, Input } from 'antd'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { PATH } from '../../app/RoutesPage'
import { useNavigate } from 'react-router-dom'
import { addCardTC } from '../Cards/CardsBLL/cards-reducer'




export const AddNewCard = () => {
  const [newCardQuestion, setNewCardQuestion] = useState('')
  const [newCardAnswer, setNewCardAnswer] = useState('')
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const  cardsPack_id = useAppSelector((state) => state.cards.params.cardsPack_id)
 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }



  const onClickAddNewCard = () => {
   
    if (cardsPack_id) {
      setNewCardQuestion(newCardQuestion)
      setNewCardAnswer(newCardAnswer)
      dispatch(
        addCardTC({
          cardsPack_id: cardsPack_id,
          question: newCardQuestion,
          answer: newCardAnswer,
        })
      )
      setNewCardQuestion('')
      setNewCardAnswer('')
    }
  }
  
 

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Input
          value={newCardQuestion}
          placeholder={'Enter card question'}
          onChange={(e) => setNewCardQuestion(e.currentTarget.value)}
        />
        <Input
          value={newCardAnswer}
          placeholder={'Enter card answer'}
          onChange={(e) => setNewCardAnswer(e.currentTarget.value)}
        />

        <div className={s.btn}>
          <Button onClick={onClickAddNewCard}>Save </Button>
        </div>
      </div>
    </div>
  )
}
