import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { CardPacksType } from "../../PacksAPI/PacksAPI"
import {useNavigate} from 'react-router-dom';
import { cardsActions } from "../../../Cards/CardsBLL/cards-reducer";
import {  Button, Radio } from "antd";
import { DeletePackModal } from "../../../Modals/DeletePackModal";



type PackPropsType={
  pack: CardPacksType
}

export const Pack:FC<PackPropsType>=({pack})=>{
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
   const userId = useAppSelector((state) => state.profile.user._id)
  
const formatDate=(date: Date | string | number)=>{
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}
const openCard=()=>{
  dispatch(cardsActions.searchQuestion(''))
  dispatch(cardsActions.searchAnswer(''))
  dispatch(cardsActions.setPackName(pack.name))
  dispatch(cardsActions. setPackId(pack._id))
  navigate('/cards/:packId/:packName')

}
const deletePackOn = () => {
  setIsDeletingOpen(true)

}

  return (<>
  <tr>
        <td onClick={openCard} style={{cursor: 'pointer'}}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{formatDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
       
        <Button  size="small" disabled={pack.cardsCount === 0}  onClick={() => {
                                            navigate(`/learn/${pack._id}/${pack.name}`)}}>
                                             Learn 
                                             </Button>
        <Button  size="small" disabled={userId !== pack.user_id}> Edit</Button>
        <Button  size="small"  disabled={userId !== pack.user_id} onClick={deletePackOn}> Delete</Button>
        <DeletePackModal setIsOpenModal={setIsOpenModalDelete} isOpenModal={isDeletingOpen}   cardPackId={pack._id} />
         
       
        </td>
    </tr>


</>
  )
}