import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { Timer } from '@/utils';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="info">
      <div className="info-title">{props?.detail?.title}</div>
      <div className="info-msg">简介：{props?.detail?.msg}</div>
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
      <Button className="info-btn" type="warning">
        预定
      </Button>
    </div>
  );
}
