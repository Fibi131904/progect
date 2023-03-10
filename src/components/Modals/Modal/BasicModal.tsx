import React, { ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppSelector } from '../../../store/store';
import { CardPacksType } from '../../Packs/PacksAPI/PacksAPI';



type PropsType={
  children:ReactNode
  operetionTitle: string
  handleOperation: () => void
  handleCloseOperation?: () => void
  setIsOpenModal: (value: boolean) => void
  isOpenModal: boolean


}

export const BasicModal: React.FC<PropsType> = ({children, operetionTitle,  handleOperation,isOpenModal,setIsOpenModal, handleCloseOperation } ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useAppSelector((state) => state.profile.user._id)

  const showModal = () => {
    setIsModalOpen(true);
  };
//закрытие
  const handleOk = () => {
    handleOperation()
    setIsModalOpen(false);
  };
//отмена
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOpenModal(false);
    handleCloseOperation && handleCloseOperation()
  };
 
  return (
    <>
      <Button type='default' onClick={showModal} size={'small'} >
      {operetionTitle}  
      </Button>
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       {children}      
      </Modal>
    </>
  );
};