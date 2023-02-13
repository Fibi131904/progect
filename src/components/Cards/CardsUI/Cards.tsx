import {useNavigate, useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store'
import s from './Cards.module.css'

import { Button } from 'antd'
import { CardsTable } from './CardsTable';




export const Cards = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const packName= useAppSelector((state) => state.cards.packName)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)
  const userId = useAppSelector((state) => state.profile.user._id)

  const {packUserId} = useParams<'packUserId'>()

const onBackPage=()=>{
    navigate(-1)
}

  return (
    <div className={s.container}>
  
  
            <div className={s.btnBlock}>
                <Button onClick={onBackPage}>
                    ← Back to Packs List
                </Button>             
              
            </div>
            <div className={s.backAndTitle}>
            <div className={s.title}>{packName}</div>
            <Button >AddCardForm</Button> 
            </div>
            <div >
               
            <div className={s.searchFields}>
                    <div>
                        SearchField 
                    </div>
                    <div>
                        SearchField 
                    </div>
                </div>
                <div>
                    {
                        userId === packUserId &&
                        <Button >
                          Add card
                        </Button>
                    }
                </div>
            </div>
            <div className={s.table}><CardsTable/></div>
     
</div>
   
  )
}
