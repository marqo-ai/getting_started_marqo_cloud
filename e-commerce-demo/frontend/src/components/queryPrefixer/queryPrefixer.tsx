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
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'outline', label: 'Outline' },
  { value: 'grayscale', label: 'Grayscale' },
  { value: 'stylized', label: 'Stylized' },
  { value: 'noir', label: 'Noir' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'comic', label: 'Comic' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'oilpaint', label: 'Oil Paint' },
  { value: 'lowpoly', label: 'Lowpoly' },
  { value: 'artistic', label: 'Artistic' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'pixelart', label: 'Pixelart' },
  { value: 'vector', label: 'Vector' },
  { value: 'minimalistic', label: 'Minimalistic' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'steampunk', label: 'Steampunk' },
  { value: 'realism', label: 'Realism' },
  { value: 'impressionist', label: 'Impressionist' },
  { value: 'surreal', label: 'Surreal' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'popart', label: 'Pop Art' },
  { value: 'glitch', label: 'Glitch' },
  { value: 'neon', label: 'Neon' },
  { value: 'isometric', label: 'Isometric' },
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
