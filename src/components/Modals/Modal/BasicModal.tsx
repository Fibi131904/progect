import React, { ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';


type PropsType={
  children:ReactNode
  operetionTitle: string
}

export const BasicModal: React.FC<PropsType> = ({children, operetionTitle}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
      {operetionTitle}
      </Button>
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       {children}      
      </Modal>
    </>
  );
};