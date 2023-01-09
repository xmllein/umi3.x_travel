import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';
export default {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined,
  },
  // 同步
  reducers: {
    getUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    editUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // 异步
  effects: {
    // 获取用户信息
    async getUserAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/detail',
        body: payload,
      });
      if (user) {
        dispatch({
          type: 'getUser',
          payload: user,
        });
      }
    },
    // 编辑用户信息
    async editUserAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/edit',
        body: payload,
      });
      if (user) {
        Toast.success('修改成功');
        history.push('/user');
        // dispatch({
        //   type: 'editUser',
        //   payload: user,
        // });
      }
    },

    // 用户登录
    async loginAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/login',
        body: payload,
      });
      if (user) {
        // console.log(urlGet('from'));
        // cookie.set('user', user);
        // 本地存储
        localStorage.setItem('token', user.token);
        localStorage.setItem('username', user.username);
        console.log(urlGet('from'));
        urlGet('from') && history.push(urlGet('from'));
        Toast.success('登录成功');
      }
    },
    // 用户注册
    async registerAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/register',
        body: payload,
      });
      if (user) {
        // cookie.set('user', user);
        // 本地存储token
        localStorage.setItem('token', user.token);
        localStorage.setItem('username', user.username);
        Toast.success('注册成功');
        history.push('/login');
      }
    },

    // 用户退出
    async logoutAsync(dispatch, rootState, payload) {
      const user = await Http({
        url: '/user/logout',
        body: payload,
      });
      if (user) {
        // cookie.remove('user');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        Toast.success('退出成功');
        history.push({
          pathname: '/login',
          query: {
            from: location.pathname,
          },
        });
      }
    },
  },
};
