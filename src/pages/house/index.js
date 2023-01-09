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
      order,
      hasOrderAsync,
      addOrderAsync,
      delOrderAsync,
    },
  } = useStoreHook();

  // 是否有预定
  useEffect(() => {
    hasOrderAsync({
      id: query?.id,
    });
  }, []);

  // 获取房屋详情
  useEffect(() => {
    getDetailAsync({
      id: query?.id || 1,
    });
  }, []);

  // 获取评论
  useEffect(() => {
    getCommentsAsync({
      houseId: query?.id,
    });
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

  // 子组件调用
  const handleBtnClick = (id) => {
    // 如果id不存在，可以添加订单
    if (!id) {
      addOrderAsync({
        id: query?.id,
      });
    } else {
      // 如果id存在，可以删除订单
      delOrderAsync({
        id: query?.id,
      });
    }
  };

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />

      {/* 房屋信息 */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick} />

      {/* 评论列表 */}
      <Lists lists={comments} showLoadMore={showLoadMore} />

      {/* footer */}
      <Footer />
    </div>
  );
}
