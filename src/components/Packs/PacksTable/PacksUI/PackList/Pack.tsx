import { FC } from "react"
import { CardPacksType } from "../../../PacksAPI/PacksAPI"

type PackPropsType={
  pack: CardPacksType
}

export const Pack:FC<PackPropsType>=({pack})=>{
  return <tr>
        <td >{pack.name}</td>
        <td>{pack.cardsCount}</td>
        <td>lastUpdate</td>
        <td>{pack.user_name}</td>
        <td>
            PackActions 
        </td>
    </tr>
}