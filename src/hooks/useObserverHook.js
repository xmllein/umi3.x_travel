import { useEffect } from 'react';

let observer = null;
/**
 *
 * @param {*} ele 监控的元素
 * @param {*} callback 回调函数
 * @param {*} watch 依赖项监听
 */
export default function useObserverHook(ele, callback, watch = []) {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        observer.unobserve(node);
        observer.disconnect();
      }
    };
  }, watch);
}
