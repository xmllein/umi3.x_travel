import React, { useState, useEffect } from 'react';
// import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import { ShowLoadmore } from '@/components';
import { OrderSkeletons } from '@/skeletons';
import Item from '../Item';
export default function (props) {
  // 暂无数据
  const [state, setState] = useState(false);

  useEffect(() => {}, [
    setTimeout(() => {
      if (isEmpty(props?.orders)) {
        setState(true);
      }
    }, 1500),
  ]);

  return (
    <div>
      {isEmpty(props?.orders) ? (
        <>
          {state ? <ShowLoadmore showLoadMore={false} /> : <OrderSkeletons />}
        </>
      ) : (
        <div className="tab-lists">
          {props?.orders?.map((item) => (
            <Item key={item.id} {...item} type={props.type} />
          ))}
          <ShowLoadmore showLoadMore={props?.showLoadMore} />
        </div>
      )}
    </div>
  );
}
