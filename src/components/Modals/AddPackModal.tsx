import { Button, Checkbox, Input } from "antd"
import { FC, useState } from "react"
import { useAppDispatch } from "../../store/store"
import { addPackTC } from "../Packs/PacksBLL/packs-reducer"
import { BasicModal } from "./Modal/BasicModal"
import {useNavigate} from 'react-router-dom';

type AddNewPackType = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
export const AddPackModal:FC<AddNewPackType>=({isOpenModal, setIsOpenModal})=>{

  const [newPackName, setNewPackName] = useState<string>('')
  const [isPrivate, setPrivate] = useState(false)
  const [newDeckCover, setNewDeckCover] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickAddPack = () => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate))
    onClickCleanUpStates()
    navigate('/packs')
   }

  const onClickCleanUpStates = () => {
    setNewPackName('')
    setPrivate(false)
  }

  return (
    <BasicModal  operetionTitle={'Add new Pack'}   handleOperation={onClickAddPack} isOpenModal={isOpenModal}
    setIsOpenModal={setIsOpenModal}>

<div>Add new pack</div>
<Input
        value={newPackName}
        placeholder={'Enter pack name'}
        onChange={(e) => setNewPackName(e.currentTarget.value)}
      />
      <Checkbox
        checked={isPrivate}
        onChange={(e) => setPrivate(e.target.checked)}
        value={ 'Private pack'}
      />
     
    </BasicModal>
  )
}
