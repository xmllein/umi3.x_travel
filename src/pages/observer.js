import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useObserverHook } from '@/hooks';

let observer = null;

export default function (props) {
  const [state, setState] = useState();

  useObserverHook(
    '#loading',
    (entries) => {
      console.log(entries);
    },
    [],
  );
  /**
  useEffect(() => {
    console.log('进入页面');
    const node = document.getElementById('loading')
    // observer
    observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('可见');
          document.getElementById('loading').innerText = '可见';
        } else {
          console.log('不可见');
          document.getElementById('loading').innerText = '不可见';
        }
      });
    });
    observer.observe(node);

    // 离开页面时，取消监听
    return () => {
      console.log('离开页面');
      if (observer && node) {
        // 解绑元素
        // observer.unobserve(node);
        // 停止监听
        observer.disconnect();
      }
    };
  }, []);
*/
  const handleClick = () => {
    history.push('/');
  };

  return (
    <div>
      observer
      <button onClick={handleClick}>离开页面</button>
      <div
        id="loading"
        style={{
          width: '100px',
          height: '100px',
          background: '#f60',
          marginTop: '1000px',
        }}
      >
        loading
      </div>
    </div>
  );
}
