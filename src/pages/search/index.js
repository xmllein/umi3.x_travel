import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { ShowLoadmore } from '@/components';
import { CommonEnum } from '@/enums';
// 引入样式
import './index.less';
export default function (props) {
  // 获取路由参数
  const { query } = useLocation();
  // 搜索框值
  const [houseName, setHouseName] = useState('');
  // 分页 默认值
  const [page, setPage] = useState(CommonEnum.PAGE);
  // 列表数据
  const [houseLists, setHouseLists] = useState([]);
  // 是否显示loadmore
  const [showLoadMore, setShowLoadMore] = useState(true);
  // 搜索值
  const [houseSubmitName, setHouseSubmitName] = useState('');

  // 请求搜索结果
  const [houses, housesLoading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName: houseSubmitName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    watch: [page.pageNum, houseSubmitName],
  });

  /**
   * 1，监听loading元素是否可见
   * 2，修改分页数据
   * 3，监听分页数据是否变化，发送接口，获取数据
   * 4，监听loading变化，拼装数据
   */
  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    (entries) => {
      // console.log(entries);
      if (!housesLoading && entries[0].isIntersecting) {
        // 修改分页数据
        setPage((prev) => {
          return {
            ...prev,
            pageNum: prev.pageNum + 1,
          };
        });
      }
    },
    null,
  );

  // 图片懒加载
  useImgHook(
    '.item-img',
    (entries) => {
      console.log(entries);
    },
    null,
  );

  useEffect(() => {
    // 数据已经加载完毕
    if (!housesLoading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        // 判断是否还有数据
        if (houses.length < page.pageSize) {
          setShowLoadMore(false);
        }
      } else {
        // 没有数据了
        setShowLoadMore(false);
      }
    }
  }, [housesLoading]);

  // 搜索框输入
  const handleChange = (val) => {
    setHouseName(val);
  };

  const _handleSubmit = (val) => {
    setHouseName(val);
    setHouseSubmitName(val);
    // 重置分页数据
    setPage(CommonEnum.PAGE);
    // 重置列表数据
    setHouseLists([]);
  };

  // 搜索框取消
  const handleCancel = () => {
    _handleSubmit('');
  };

  // 搜索框提交
  const handleSubmit = (val) => {
    _handleSubmit(val);
  };

  return (
    <div className="search-page">
      {/* 顶部搜索栏 */}
      <SearchBar
        placeholder="请输入搜索民宿"
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      {/* 搜索结果 */}
      {!houseLists.length ? (
        <ActivityIndicator toast text="Loading..." />
      ) : (
        <div className="result">
          {houseLists?.map((item) => (
            <div className="item" key={item.id}>
              <img
                data-src={item.img}
                src={require('../../assets/blank.png')}
                className="item-img"
                alt="img"
              />
              <div className="item-right">
                <div className="title">{item.title}</div>
                <div className="price">￥{item.price}</div>
              </div>
            </div>
          ))}
          {/* 加载更多 */}
          <ShowLoadmore showLoadMore={showLoadMore} />
        </div>
      )}
    </div>
  );
}
