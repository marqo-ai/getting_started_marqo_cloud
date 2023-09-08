import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Slider } from 'antd';
import { RootState } from '../../store/store';
import {
  setNegQueryWeight,
  setPosQueryWeight,
  setQueryWeight,
  setTotalFavouriteWeight,
} from '../../slices/searchSettingsSlice';

const SearchSettings = () => {
  const searchSettings = useSelector((state: RootState) => state.searchSettings);

  const dispatch = useDispatch();

  const onQueryChange = (value: any) => {
    dispatch(setQueryWeight(value));
  };

  const onPosChange = (value: any) => {
    dispatch(setPosQueryWeight(value));
  };

  const onNegChange = (value: any) => {
    dispatch(setNegQueryWeight(value));
  };

  const onFavChange = (value: any) => {
    dispatch(setTotalFavouriteWeight(value));
  };

  return (
    <div className="search-settings">
      <Row>
        <Col span={6}>
          <div>Query weight:</div>
        </Col>
        <Col span={12}>
          <Slider
            min={0}
            max={2}
            step={0.01}
            onChange={onQueryChange}
            value={searchSettings.queryWeight}
          />
        </Col>
        <Col span={4}>
          <div>{searchSettings.queryWeight}</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div>More of weight:</div>
        </Col>
        <Col span={12}>
          <Slider
            min={0}
            max={2}
            step={0.01}
            onChange={onPosChange}
            value={searchSettings.posQueryWeight}
          />
        </Col>
        <Col span={4}>
          <div>{searchSettings.posQueryWeight}</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div>Less of weight:</div>
        </Col>
        <Col span={12}>
          <Slider
            min={-2}
            max={0}
            step={0.01}
            onChange={onNegChange}
            value={searchSettings.negQueryWeight}
          />
        </Col>
        <Col span={4}>
          <div>{searchSettings.negQueryWeight}</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div>Favourite weight:</div>
        </Col>
        <Col span={12}>
          <Slider
            min={-2}
            max={2}
            step={0.01}
            onChange={onFavChange}
            value={searchSettings.totalFavouriteWeight}
          />
        </Col>
        <Col span={4}>
          <div>{searchSettings.totalFavouriteWeight}</div>
        </Col>
      </Row>
    </div>
  );
};

export default SearchSettings;
