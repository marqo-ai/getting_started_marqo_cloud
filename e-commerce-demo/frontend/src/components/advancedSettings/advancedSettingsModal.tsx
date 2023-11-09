import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { resetAdvancedSettings } from '../../slices/advancedSettingsSlice';
import AdvancedSettings from './advancedSettings';

import './advancedSettingsModal.css';

const AdvancedSettingsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    dispatch(resetAdvancedSettings());
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Advanced Settings
      </Button>
      <Modal
        title="Advanced Settings"
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
        <AdvancedSettings />
      </Modal>
    </div>
  );
};

export default AdvancedSettingsModal;
