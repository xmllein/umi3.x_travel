import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { isEmpty } from 'project-libs';
import { Http } from '@/utils';

// 引入样式
import './index.less';

export default function (props) {
  // 分页
  const [page, setPage] = useState(CommonEnum.PAGE);
  // 订单数据
  const [orders, setOrders] = useState([]);
  // 订单加载状态
  const [orderLoading, setOrderLoading] = useState(true);
  // type状态
  const [type, setType] = useState(0);
  // tabs
  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ];

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/order/lists',
      body: {
        ...page,
        pageNum,
        type,
      },
    });
    return result;
  };

  // 获取订单数据
  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);
    if (!isEmpty(result) && result.length === page.pageSize) {
      setOrders([...orders, ...result]);
      setOrderLoading(true);
    } else {
      setOrderLoading(false);
    }
  };

  // 监听滚动
  /**
   * 1， 页面初始化时候请求数据
   * 2， 监听loadmore组件是否出现在视口中
   * 3， 如果出现在视口中，请求下一页数据
   * 4， 拼装数据，然后setPage
   */
  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    async (entries) => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        const result = await invokeHttp(page.pageNum + 1);
        if (
          !isEmpty(result) &&
          !isEmpty(result) &&
          result.length === page.pageSize
        ) {
          setOrders([...orders, ...result]);
          setPage({
            ...page,
            pageNum: page.pageNum + 1,
          });
          setOrderLoading(true);
        } else {
          setOrderLoading(false);
        }
      }
    },
    null,
  );

  useEffect(() => {
    fetchOrder(1);
  }, [type]);

  // tab切换
  const handleChange = (tab, index) => {
    setType(tab.sub);
    // 重置分页
    setPage(CommonEnum.PAGE);
    // 重置数据
    setOrders([]);
    // 重置加载状态
    setOrderLoading(true);
  };

  return (
    <div className="order-page">
      <Tabs tabs={tabs} onChange={handleChange}>
        <div className="tab">
          <Lists orders={orders} type={0} showLoadMore={orderLoading} />
        </div>
        <div className="tab">
          <Lists orders={orders} type={1} showLoadMore={orderLoading} />
        </div>
      </Tabs>
    </div>
  );
}
