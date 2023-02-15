import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { CardPacksType } from "../../PacksAPI/PacksAPI"
import {useNavigate} from 'react-router-dom';
import { cardsActions } from "../../../Cards/CardsBLL/cards-reducer";
import {  Radio } from "antd";


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
  dispatch(cardsActions.searchQuestion(''))
  dispatch(cardsActions.searchAnswer(''))
  dispatch(cardsActions.setPackName(pack.name))
  dispatch(cardsActions. setPackId(pack._id))
  navigate('/cards/:packId/:packName')

}

  return <tr>
        <td onClick={openCard} style={{cursor: 'pointer'}}>{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{formatDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
        <Radio.Group size="small">
        <Radio.Button  disabled={pack.cardsCount === 0}  onClick={() => {
                                            navigate(`/learn/${pack._id}/${pack.name}`)}}>
                                             Learn 
                                             </Radio.Button>
        <Radio.Button disabled={userId !== pack.user_id}> Edit</Radio.Button>
        <Radio.Button  disabled={userId !== pack.user_id}> Delete</Radio.Button>
        </Radio.Group>
       
        </td>
    </tr>
}