
import { FC } from 'react'
import { useAppDispatch } from '../../store/store'
import { deletePackTC } from '../Packs/PacksBLL/packs-reducer'
import { BasicModal } from './Modal/BasicModal'

type DeletePackModalType = {
  packName?: string
  cardPackId?: string
  setIsOpenModal: (value: boolean) => void
  isOpenModal: boolean,
}

export const DeletePackModal: FC<DeletePackModalType> = ({
  isOpenModal,
  packName,
  cardPackId,
  setIsOpenModal,
}) => {
  const dispatch = useAppDispatch()

  const deleteCardPack = () => {
    dispatch(deletePackTC(cardPackId!))
    setIsOpenModal(false)
  }

  return (
    <BasicModal
      operetionTitle={'Delete'}
      handleOperation={deleteCardPack}
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}>
        
      <div>Delete Pack</div>
      <div>
        Do you really want to remove <b>{packName}</b>?
      </div>
      <div>All cards will be excluded from this course.</div>
    </BasicModal>
  )
}
