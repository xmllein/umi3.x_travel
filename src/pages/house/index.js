import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

// 引入样式
import './index.less';

export default function (props) {
  // 获取路由参数
  const { query } = useLocation();

  const {
    house: {
      detail,
      getDetailAsync,
      comments,
      getCommentsAsync,
      reloadComments,
      reloadCommentsNum,
      showLoadMore,
      resetData,
    },
  } = useStoreHook();

  useEffect(() => {
    getDetailAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    getCommentsAsync({});
  }, [reloadCommentsNum]);

  // 离开页面，重置数据
  useEffect(() => {
    return () => {
      resetData({
        detail: {},
      });
    };
  }, []);

  // 监听数据变化
  /**
   * 1，监听loadmore是否显示
   * 2， 触发reload，修改分页
   * 3， 监听reload变化，重新请求数据
   * 4， 拼装数据
   */
  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    (entries) => {
      if (
        comments &&
        comments.length &&
        showLoadMore &&
        entries[0].isIntersecting
      ) {
        // console.log('加载更多');
        reloadComments();
      }
    },
    [comments, showLoadMore],
  );

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />

      {/* 房屋信息 */}
      <Info detail={detail?.info} />

      {/* 评论列表 */}
      <Lists lists={comments} showLoadMore={showLoadMore} />

      {/* footer */}
      <Footer />
    </div>
  );
}
