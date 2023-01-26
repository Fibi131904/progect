import { FC } from "react"
import { CardPacksType } from "../../../PacksAPI/PacksAPI"


type PackPropsType={
  pack: CardPacksType
}

export const Pack:FC<PackPropsType>=({pack})=>{
const formatDate=(date: Date | string | number)=>{
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}

  return <tr>
        <td >{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>{formatDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
            PackActions 
        </td>
    </tr>
}