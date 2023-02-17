import React, { useCallback, useState } from 'react'
import s from './AddNewPack.module.css'
import { Button, Checkbox, Input } from 'antd'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { PATH } from '../../app/RoutesPage'
import { addPackTC } from '../Packs/PacksBLL/packs-reducer'
import {useNavigate} from 'react-router-dom';

export const AddNewPack = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const [newPackName, setNewPackName] = useState<string>('')
  const [isPrivate, setPrivate] = useState(false)
  const [newDeckCover, setNewDeckCover] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  const onClickAddPack = () => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate))
    onClickCleanUpStates()
  
  }

  const onClickCleanUpStates = () => {
    setNewPackName('')
    setPrivate(false)
  }
  return (
    <div className={s.container}>
      <div className={s.form}>
      <Input
        value={newPackName}
        placeholder={'Enter pack name'}
        onChange={(e) => setNewPackName(e.currentTarget.value)}
      />
      <Checkbox
        checked={isPrivate}
        onChange={(e) => setPrivate(e.target.checked)}
      />
      Private pack
     
      <div className={s.btn}>
        <Button onClick={onClickAddPack}>Save </Button>
      </div>
    </div>
    </div>
  )
}
