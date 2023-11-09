import { Checkbox, Col, Input, Row, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  setAutoPrefix,
  setCustomPrefix,
  setImplicitMoreExpansion,
  setLimit,
} from '../../slices/advancedSettingsSlice';

const AdvancedSettings = () => {
  const autoPrefix = useSelector((state: RootState) => state.advancedSettings.autoPrefix);
  const implicitMoreExpansion = useSelector(
    (state: RootState) => state.advancedSettings.implicitMoreExpansion,
  );
  const customPrefix = useSelector((state: RootState) => state.advancedSettings.customPrefix);
  const limit = useSelector((state: RootState) => state.advancedSettings.limit);

  const dispatch = useDispatch<AppDispatch>();

  const onPrefixToggle = (e: CheckboxChangeEvent) => {
    dispatch(setAutoPrefix(e.target.checked));
  };

  const onImplicitMoreExpansionToggle = (e: CheckboxChangeEvent) => {
    dispatch(setImplicitMoreExpansion(e.target.checked));
  };

  const onCustomPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomPrefix(e.target.value));
    if (e.target.value !== '') {
      dispatch(setAutoPrefix(false));
    }
  };

  const onLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLimit = parseInt(e.target.value);
    if (newLimit > 150) {
      newLimit = 150;
    } else if (newLimit < 0) {
      newLimit = 1;
    }

    dispatch(setLimit(newLimit));
  };

  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Checkbox onChange={onPrefixToggle} checked={autoPrefix} disabled={customPrefix !== ''}>
            Auto Prefix
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Checkbox onChange={onImplicitMoreExpansionToggle} checked={implicitMoreExpansion}>
            Implicit More Expansion
          </Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div>Custom prefix:</div>
        </Col>
        <Col span={12}>
          <Input
            placeholder="Custom query prefix"
            value={customPrefix}
            onChange={onCustomPrefixChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div>Limit:</div>
        </Col>
        <Col span={12}>
          <Input
            placeholder="Limit"
            value={limit}
            type="number"
            onChange={onLimitChange}
            min={1}
            max={150}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AdvancedSettings;
