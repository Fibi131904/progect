import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { CardPacksType } from '../../PacksAPI/PacksAPI'
import { useNavigate } from 'react-router-dom'
import { cardsActions } from '../../../Cards/CardsBLL/cards-reducer'
import { Button } from 'antd'
import { DeletePackModal } from '../../../Modals/DeletePackModal'
import { EditPackModal } from '../../../Modals/EditPackModal'

type PackPropsType = {
  pack: CardPacksType
}

export const Pack: FC<PackPropsType> = ({ pack }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
  const userId = useAppSelector((state) => state.profile.user._id)

  const formatDate = (date: Date | string | number) => {
    return (
      new Date(date).toLocaleDateString('ru-RU') +
      ' ' +
      new Date(date).toLocaleTimeString()
    )
  }
  const openCard = () => {
    dispatch(cardsActions.searchQuestion(''))
    dispatch(cardsActions.searchAnswer(''))
    dispatch(cardsActions.setPackName(pack.name))
    dispatch(cardsActions.setPackId(pack._id))
    navigate('/cards/:packId/:packName')
  }

  return (
    <>
      <tr>
        <td onClick={openCard} style={{ cursor: 'pointer' }}>
          {pack.name}
        </td>
        <td>{pack.cardsCount}</td>
        <td>{formatDate(pack.updated)}</td>
        <td>{pack.user_name}</td>
        <td>
          <Button
            size="small"
            disabled={pack.cardsCount === 0}
            onClick={() => {
              navigate(`/learn/${pack._id}/${pack.name}`)
            }}>
            Learn
          </Button>
          {pack.user_id === userId ? (
            <>
              <EditPackModal
                packId={pack._id}
                name={pack.name}
                setIsOpenModal={setIsOpenModalUpdate}
                isOpenModal={isOpenModalUpdate}
              />

              <DeletePackModal
                isOpenModal={isOpenModalDelete}
                setIsOpenModal={setIsOpenModalDelete}
                cardPackId={pack._id}
                packName={pack.name}
              />
            </>
          ) : (
            <>
              <Button size="small" disabled>
                Update Pack
              </Button>
              <Button size="small" disabled>
                Delete
              </Button>
            </>
          )}
        </td>
      </tr>
    </>
  )
}
