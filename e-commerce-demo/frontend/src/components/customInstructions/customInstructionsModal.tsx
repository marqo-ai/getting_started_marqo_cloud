import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import CustomInstructions from './customInstructions';
import { AppDispatch } from '../../store/store';
import { resetCustomInstructions } from '../../slices/customInstructionsSlice';

const CustomInstructionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    dispatch(resetCustomInstructions());
  };

  return (
    <div className="custom-instructions-modal">
      <Button type="primary" onClick={showModal}>
        Custom Instructions
      </Button>
      <Modal
        title="Custom Instructions"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button onClick={handleReset}>Reset</Button>,
          <Button type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <CustomInstructions />
      </Modal>
    </div>
  );
};

export default CustomInstructionModal;
