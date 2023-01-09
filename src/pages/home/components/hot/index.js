import React, { useState, useEffect, memo } from 'react';
import { history } from 'umi';

function Hot(props) {
  const { houses, housesLoading } = props;

  useEffect(() => {}, []);

  // 点击跳转到详情页
  const handlClick = (item) => {
    history.push({
      pathname: '/house',
      query: {
        id: item.id,
      },
    });
  };

  return (
    <div className="hot">
      <h1>最热民宿</h1>
      <div className="hot-lists">
        {houses?.map((item) => {
          console.log(item);
          return (
            <div
              className="hot-lists-item"
              key={item.id}
              onClick={() => handlClick(item)}
            >
              <img className="img" alt="img" src={item?.imgs[0]?.url} />
              <div className="title">{item.title}</div>
              <div className="info">{item.info}</div>
              <div className="price">¥{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Hot);
