import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import s from './Cards.module.css'
import { useParams} from 'react-router-dom';
import { Button } from 'antd'
import { CardsTable } from './CardsTable';
import { addCardTC } from '../CardsBLL/cards-reducer';



export const Cards = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
//   const packName= useAppSelector((state) => state.cards.packName)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)
  const userId = useAppSelector((state) => state.profile.user._id)

  const {packUserId} = useParams<'packUserId'>()



  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.container}>
   <Button >AddCardForm</Button> 
    <div>
        <div >
            <div>
                <Button >
                    ←
                </Button>
                <div >packName</div>
            </div>
            <div >
                <div >
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
            <div ><CardsTable/></div>
        </div>
    </div>
</div>
   
  )
}
