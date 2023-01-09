import React, { useState, useEffect } from 'react';
import { ShowLoadmore } from '@/components';
import { Timer } from '@/utils';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      <div className="comment-lists">
        {props?.lists?.map((item) => {
          return (
            <div className="comment-lists_item" key={item.id}>
              <img
                alt="user"
                className="avatar"
                src={'https://www.itying.com/images/flutter/slide01.jpg'}
              />
              <div className="right">
                <div className="right-top">
                  <p>{item?.user?.username}</p>
                  <p>{Timer(item.createTime)}</p>
                </div>
                <div className="right-bottom">{item.msg}</div>
              </div>
            </div>
          );
        })}

        <ShowLoadmore showLoadMore={props?.showLoadMore} />
      </div>
    </div>
  );
}
