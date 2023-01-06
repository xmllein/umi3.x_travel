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
  },

  // 同步方法
  reducers: {
    getDetail(state, payload) {
      return { ...state, detail: payload };
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
        url: '/comments/lists',
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
        url: '/comments/add',
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
  },
};
