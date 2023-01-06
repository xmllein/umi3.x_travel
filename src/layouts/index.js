import { ErrorBoundary, MenuBar } from '@/components';
import { useLocation } from 'umi';
import { StoreProvider } from 'think-react-store';
import * as store from '@/stores';

// 引入样式
import styles from './index.less';

export default function IndexPage(props) {
  const location = useLocation();
  const path = ['/', '/user', '/order'];
  return (
    <StoreProvider store={store}>
      <MenuBar
        show={path.includes(location.pathname)}
        pathname={location.pathname}
      />
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </StoreProvider>
  );
}
