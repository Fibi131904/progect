import { useAppSelector } from "../../../store/store"
import { CardsTableHeader } from "./CardsTableHeader"
import { useParams} from 'react-router-dom';
import { CardsList } from "./CardsList";

export const CardsTable=()=>{
  const {packUserId} = useParams<'packUserId'>()
  const userId = useAppSelector((state) => state.profile.user._id)
  const cards = useAppSelector((state) => state.cards.cards)

  return <div >
  <table >
      <thead>
      <tr>
          <CardsTableHeader text={'Question'} param={'question'}/>
          <CardsTableHeader text={'Answer'} param={'answer'}/>
          <CardsTableHeader text={'Updated'} param={'updated'}/>
          <CardsTableHeader text={'Grade'} param={'grade'}/>
          {
              userId === packUserId &&
              <th>
                <span>Actions</span>
              </th>
          }
      </tr>
      </thead>
      <tbody>
      <CardsList cards={cards}/>
      <tr>
          <td colSpan={5} >
              <div>
                  Paginator
              </div>
          </td>
      </tr>
      </tbody>
  </table>
</div>
}
