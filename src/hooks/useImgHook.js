// 图片懒加载hook
import { useEffect } from 'react';
import { isEmpty } from 'project-libs';
/**
 * 1，监听图片是否进入可视区域
 * 2，如果进入可视区域, 加载图片
 * 3，停止监听
 * @param {*} ele
 * @param {*} callback
 * @param {*} watch
 */

let observer = null;
export default function useImgHook(ele, callback, watch = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (!isEmpty(nodes)) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
        entries.forEach((item) => {
          if (item.isIntersecting) {
            const dataSrc = item.target.getAttribute('data-src');
            item.target.setAttribute('src', dataSrc);
            // 停止监听
            observer.unobserve(item.target);
          }
        });
      });
      nodes.forEach((item) => {
        observer.observe(item);
      });
    }

    // 组件卸载
    return () => {
      if (!isEmpty(nodes) && observer) {
        observer.disconnect();
      }
    };
  }, watch);
}
