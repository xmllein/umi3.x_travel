import { Http } from '@/utils';
import { CommonEnum } from '@/enums';
// 房屋详情 数据流
export default {
  state: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoadMore: true,
    reloadCommentsNum: 0,
    order: null,
  },

  // 同步方法
  reducers: {
    getDetail(state, payload) {
      return { ...state, detail: payload };
    },
    // 获取订单
    setOrder(state, payload) {
      return { ...state, order: payload };
    },
    // 获取评论
    getComments(state, payload) {
      return { ...state, comments: payload };
    },
    // 设置显示 loadmore
    setShowLoadMore(state, payload) {
      return { ...state, showLoadMore: payload };
    },
    // 重新加载数据
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    // 重置数据
    resetData(state, payload) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoadMore: true,
        reloadCommentsNum: 0,
        ...payload,
      };
    },
  },
  // 异步方法
  effects: {
    // 获取房屋详情
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: '/house/detail',
        body: payload,
      });
      dispatch({
        type: 'getDetail',
        payload: detail,
      });
    },
    // 获取评论
    async getCommentsAsync(dispatch, rootState, payload) {
      const { comments, page } = rootState.house;
      const lists = await Http({
        url: '/comment/lists',
        body: {
          ...payload,
          pageSize: page.pageSize,
          pageNum: page.pageNum,
        },
      });
      dispatch({
        type: 'getComments',
        payload: [...comments, ...lists],
      });

      // 判断是否显示loadmore
      dispatch({
        type: 'setShowLoadMore',
        payload: lists.length ? true : false,
      });
    },
    // 添加评论
    async addCommentsAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/comment/add',
        body: payload,
      });
      if (result) {
        // 防止没有重置数据
        if (rootState.house.reloadCommentsNum === 0) {
          dispatch({
            type: 'reloadComments',
            payload: {},
          });
        }
        dispatch({
          type: 'resetData',
          payload: {},
        });
      }
    },
    // 获取订单(是否有订单)
    async hasOrderAsync(dispatch, rootState, payload) {
      const order = await Http({
        url: '/orders/hasOrder',
        body: payload,
      });
      dispatch({
        type: 'setOrder',
        payload: order,
      });
    },

    // 添加订单
    async addOrderAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/orders/addOrder',
        body: payload,
      });
      dispatch({
        type: 'setOrder',
        payload: result,
      });
    },

    // 删除订单
    async delOrderAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/orders/delOrder',
        body: payload,
      });
      dispatch({
        type: 'setOrder',
        payload: result,
      });
    },
  },
};
