import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { Timer, Http } from '@/utils';
import { history } from 'umi';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  // 去支付
  const handlePay = async () => {
    const result = await Http({
      url: '/orders/pay',
      body: {
        id: props.id,
      },
    });
    if (result) {
      Toast.success('支付成功');
      // 刷新页面
      window.location.reload();
    }
  };

  const _renderPay = () => {
    switch (props.type) {
      case 0:
        return (
          <Button type="warning" size="small" onClick={handlePay}>
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

  // 点击跳转详情
  const handleClick = () => {
    history.push({
      pathname: '/house',
      query: {
        id: props?.house?.id,
      },
    });
  };

  return (
    <div className="order-item">
      <img alt="order" src={props?.house?.imgs[0]?.url} onClick={handleClick} />
      <div className="center">
        <div className="title">{props?.house?.name}</div>
        <div className="price">{props?.house?.price}</div>
        <div className="time">{Timer(props?.createTime, '')}</div>
      </div>
      <div className="pay">{_renderPay()}</div>
    </div>
  );
}
