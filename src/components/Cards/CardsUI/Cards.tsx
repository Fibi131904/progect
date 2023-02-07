
import { Link, Navigate } from 'react-router-dom'
import { PATH } from '../../../app/RoutesPage'
import { useAppDispatch, useAppSelector } from '../../../store/store'


import { useParams} from 'react-router-dom';

import { Button } from 'antd'



export const Cards = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const packName= useAppSelector((state) => state.cards.packName)
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
    <div >
    AddCardForm
    <div>
        <div >
            <div>
                <Button 
                             >
                    ←
                </Button>
                <div >{packName}</div>
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
            <div >CardsTable</div>
        </div>
    </div>
</div>
   
  )
}
