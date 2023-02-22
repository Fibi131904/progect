import { Button, Checkbox, Input } from "antd"
import { useState } from "react"
import { useAppDispatch } from "../../store/store"
import { addPackTC } from "../Packs/PacksBLL/packs-reducer"
import { BasicModal } from "./Modal/BasicModal"

export const AddPackModal=()=>{

  const [newPackName, setNewPackName] = useState<string>('')
  const [isPrivate, setPrivate] = useState(false)
  const [newDeckCover, setNewDeckCover] = useState('')
  const dispatch = useAppDispatch()

  const onClickAddPack = () => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate))
    onClickCleanUpStates()
   }

  const onClickCleanUpStates = () => {
    setNewPackName('')
    setPrivate(false)
  }

  return (
    <BasicModal  operetionTitle={'Add new Pack'} >

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
     
   
        <Button onClick={onClickAddPack}>Save </Button>
    

    </BasicModal>
  )
}