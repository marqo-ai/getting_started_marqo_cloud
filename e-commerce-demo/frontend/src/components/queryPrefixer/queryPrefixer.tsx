import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchStyle } from '../../slices/searchStyleSlice';

interface Option {
  value: string | null;
  label: string;
}

const whatStyleAreYouAfterOptions: Option[] = [
  { value: null, label: 'None' },
  { value: 'formal', label: 'Formal' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'casual', label: 'Casual' },
  { value: 'sporty', label: 'Sporty' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'business', label: 'Business' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'beachwear', label: 'Beachwear' },
  { value: 'evening', label: 'Evening' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'workout', label: 'Workout' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'lounge', label: 'Lounge' },
  { value: 'party', label: 'Party' },
  { value: 'preppy', label: 'Preppy' },
  { value: 'glam', label: 'Glam' },
  { value: 'festival', label: 'Festival' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'winter', label: 'Winter' },
  { value: 'summer', label: 'Summer' },
];

const QueryPrefixer = () => {
  const dispatch = useDispatch();

  const style = useSelector((state: RootState) => state.searchStyle.style);

  const handleChange = (value: string | null) => {
    dispatch(setSearchStyle(value));
  };

  return (
    <div>
      <Select
        placeholder="Select a style (optional)"
        options={whatStyleAreYouAfterOptions}
        onChange={handleChange}
        style={{ width: 200 }}
        value={style === null ? undefined : style}
      />
    </div>
  );
};

export default QueryPrefixer;
