import { cookie } from 'project-libs';
import { history } from 'umi';
// 运行时配置
export function onRouteChange(route) {
  // console.log(route);
  // 获取当前路径
  const nowPath = route.routes[0].routes.filter(
    (item) => item.path === route.location.pathname,
  );
  // 是否登录
  const isLogin = cookie.get('user');
  if (nowPath[0].auth && !isLogin && nowPath.length === 1) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname,
      },
    });
  }
}
