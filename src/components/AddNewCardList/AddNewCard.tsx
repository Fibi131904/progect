import React from 'react'
import s from './AddNewCard.module.css'
import { Button } from 'antd'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import { PATH } from '../../app/RoutesPage'

export const AddNewCard = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  return (
    <div className={s.container}>
      <div>This pack is empty. Click add new card to fill this pack</div>

      <div className={s.btn}>
        <Button>Add new card</Button>
      </div>
    </div>
  )
}
