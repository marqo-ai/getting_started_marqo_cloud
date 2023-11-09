import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import SearchSettings from './searchSettings';
import { AppDispatch } from '../../store/store';
import { resetSearchSettings } from '../../slices/searchSettingsSlice';

const SearchSettingsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    dispatch(resetSearchSettings());
  };

  return (
    <div className="search-settings-modal">
      <Button type="primary" onClick={showModal}>
        Search Settings
      </Button>
      <Modal
        title="Search Settings"
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
        <SearchSettings />
      </Modal>
    </div>
  );
};

export default SearchSettingsModal;
