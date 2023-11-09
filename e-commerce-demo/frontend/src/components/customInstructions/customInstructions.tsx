import { useDispatch, useSelector } from 'react-redux';
import { setCustomInstructions } from '../../slices/customInstructionsSlice';

import { Input } from 'antd';
import { AppDispatch, RootState } from '../../store/store';

const { TextArea } = Input;

const CustomInstructions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const customInstructions = useSelector(
    (state: RootState) => state.customInstructions.instructions,
  );

  const handleInstructionUpdate = (e: any) => {
    dispatch(setCustomInstructions(e.target.value));
  };

  return (
    <div className="custom-instructions">
      <TextArea
        rows={4}
        onChange={handleInstructionUpdate}
        value={customInstructions === null ? '' : customInstructions}
        placeholder="Provide some general information about your personal preferences"
      />
    </div>
  );
};

export default CustomInstructions;
