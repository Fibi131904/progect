import { FC } from "react"
import { CardPacksType } from "../../../PacksAPI/PacksAPI"
import { Pack } from "./Pack"



type PackListPropsType={
  cardPacks: CardPacksType[]
}

export const PackList:FC<PackListPropsType>=({ cardPacks})=>{
  return<>
  {
    cardPacks.map(pack=><Pack key={pack._id}pack={pack}/>)
  }
  </>
}