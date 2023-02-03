import { FC } from 'react'
import { CardPacksType } from '../../PacksAPI/PacksAPI'
import { Pack } from './Pack'

type PackListPropsType = {
  cardPacks: CardPacksType[]
}

export const PacksList: FC<PackListPropsType> = ({ cardPacks }) => {
  
  return (
    <>
      {cardPacks.length? cardPacks.map((pack) => (
        <Pack key={pack._id} pack={pack} />
      )): <div>PACKS NOT FOUND</div>}
    </>
  )
}
