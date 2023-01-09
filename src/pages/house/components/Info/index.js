import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { Timer } from '@/utils';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  const handleOrder = (id) => {
    // 父组件方法
    props?.btnClick(id);
  };

  const renderBtn = () => {
    // order 里面没有Id 说明没有预定
    if (!props?.order?.id) {
      return (
        <Button
          className="info-btn"
          type="warning"
          onClick={() => handleOrder()}
        >
          预定
        </Button>
      );
    }
    // 已经有订单了，处于未支付状态
    if (props?.order?.isPayed === 0) {
      return (
        <Button
          className="info-btn"
          type="ghost"
          onClick={() => handleOrder(props?.order?.id)}
        >
          取消预定
        </Button>
      );
    }
    // 已经有订单了，处于已支付状态
    if (props?.order?.isPayed === 1) {
      return (
        <Button className="info-btn" type="ghost">
          居住中
        </Button>
      );
    }
  };

  return (
    <div className="info">
      <div className="info-title">{props?.detail?.name}</div>
      <div className="info-msg">简介：{props?.detail?.info}</div>
      <div className="info-price">价格：{props?.detail?.price}</div>
      <div className="info-time">
        发布时间：{Timer(props?.detail?.publishTime)}
      </div>
      <div className="info-startTime">
        开始出租：{Timer(props?.detail?.startTime, '')}
      </div>
      <div className="info-endTime">
        结束出租：{Timer(props?.detail?.endTime, '')}
      </div>
      {renderBtn()}
    </div>
  );
}
