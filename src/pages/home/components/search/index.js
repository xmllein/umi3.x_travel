import React, { useState, useEffect, memo } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import { history } from 'umi';
import dayjs from 'dayjs';

function Search(props) {
  const { citys, citysLoading } = props;

  // 选中城市
  const [selectedCity, setSelectedCity] = useState(['10001']);
  // 出租时间
  const [times, setTimes] = useState('可选时间');
  // 日期选择
  const [dateShow, setDateShow] = useState(false);

  useEffect(() => {}, []);

  // 选择城市
  const handleCityChange = (val) => {
    setSelectedCity(val);
  };

  // 选择时间
  const handleDate = () => {
    setDateShow(!dateShow);
  };

  // 确认时间
  const handleDateConfirm = (startTime, endTime) => {
    setTimes(
      dayjs(startTime).format('YYYY-MM-DD') +
        '~' +
        dayjs(endTime).format('YYYY-MM-DD'),
    );
    setDateShow(!dateShow);
  };

  // 跳转搜索页面
  const handleClick = () => {
    if (times.includes('~')) {
      history.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: times.split('~')[0],
          endTime: times.split('~')[1],
        },
      });
    } else {
      Toast.fail('请选择时间');
    }
  };

  return (
    <div className="search">
      {/* 可选城市 */}
      <div className="search-addr">
        {!citysLoading && (
          <Picker
            title="城市"
            data={citys}
            value={selectedCity}
            cascade={false}
            cols={1}
            onChange={handleCityChange}
          >
            <List.Item arrow="horizontal">可选城市</List.Item>
          </Picker>
        )}
      </div>
      {/* 可选时间 */}
      <div className="search-time" onClick={handleDate}>
        <p className="search-time_left">出租时间</p>
        <p className="search-time_right">{times}</p>
      </div>
      {/* 点击按钮 */}
      <Button type="warning" size="large" onClick={handleClick}>
        搜索民宿
      </Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
}

// memo 优化
function areEqueal(prevProps, nextProps) {
  // console.log(prevProps, nextProps);
  if (
    prevProps.citys === nextProps.citys &&
    prevProps.citysLoading === nextProps.citysLoading
  ) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqueal);
