import { FC } from "react"
import { PATH } from "../../../../app/RoutesPage"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { CardPacksType } from "../../PacksAPI/PacksAPI"
import {useNavigate} from 'react-router-dom';


type PackPropsType={
  pack: CardPacksType
}

export const Pack:FC<PackPropsType>=({pack})=>{
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userId = useAppSelector((state) => state.profile.user._id)
  
const formatDate=(date: Date | string | number)=>{
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}
const openCard=()=>{

  navigate('/cards/:packId/:packName')

}

  return <tr>
        <td onClick={openCard} style={{cursor: 'pointer'}}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{formatDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
            PackActions 
        </td>
    </tr>
}