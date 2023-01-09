import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import { ErrorBoundary } from '@/components';

// 引入样式
import './index.less';

export default function (props) {
  const [state, setState] = useState();

  // 获取可选城市
  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys',
  });

  // 获取热门名宿
  const [houses, housesLoading] = useHttpHook({
    url: '/house/hot',
  });

  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <div className="home">
        {/* header 登录 */}
        <Header />
        {/* 搜索 */}
        {citys && <Search citys={citys} citysLoading={citysLoading} />}
        {/* 热门名宿 */}
        {houses && <Hot houses={houses} housesLoading={housesLoading} />}
      </div>
    </ErrorBoundary>
  );
}
