import { Input } from 'antd'
import { FC, useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { updatePackTC } from '../Packs/PacksBLL/packs-reducer'
import { BasicModal } from './Modal/BasicModal'

type EditPackModalType = {
  packId: string
  name: string
  setIsOpenModal: (value: boolean) => void
  isOpenModal: boolean,
}

export const EditPackModal: FC<EditPackModalType> = ({
  isOpenModal,
  packId,
  name, 
  setIsOpenModal,
}) => {
  const [newPackName, setNewPackName] = useState<string>(name)
  const dispatch = useAppDispatch()

  const updateCardPack = () => {
    dispatch(updatePackTC(packId, newPackName))
    setIsOpenModal(false)
 
  }


  return (
    <BasicModal
      operetionTitle={'Update Pack'}
      handleOperation={updateCardPack}
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}>
 <div>Pack name:</div>
       <Input value={newPackName} placeholder={'Enter new name'}  onChange={(e)=>setNewPackName(e.currentTarget.value)}/> 
       <div>Do you really want to change <b>{name}</b>?</div>
   
    </BasicModal>
  )
}
