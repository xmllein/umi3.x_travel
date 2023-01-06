import React, { useState, useEffect } from 'react';
// import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import { ShowLoadmore } from '@/components';
import { OrderSkeletons } from '@/skeletons';
import Item from '../Item';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      {isEmpty(props?.orders) ? (
        <OrderSkeletons />
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
