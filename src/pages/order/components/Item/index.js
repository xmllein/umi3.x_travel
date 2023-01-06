import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  const _renderPay = () => {
    switch (props.type) {
      case 0:
        return (
          <Button type="warning" size="small">
            去支付
          </Button>
        );
        break;
      case 1:
        return <Button size="small">已完成</Button>;
        break;
      default:
        break;
    }
  };

  return (
    <div className="order-item">
      <img alt="order" src={props?.img} />
      <div className="center">
        <div className="title">{props?.title}</div>
        <div className="price">{props?.price}</div>
        <div className="time">{props?.createTime}</div>
      </div>
      <div className="pay">{_renderPay()}</div>
    </div>
  );
}
