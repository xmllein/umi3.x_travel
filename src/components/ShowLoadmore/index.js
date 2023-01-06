import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommonEnum } from '@/enums';

// 引入样式
import './index.less';

export default function ShowLoadmore(props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      {props.showLoadMore ? (
        <div className="loading-text" id={CommonEnum.LOADING_ID}>
          loading
        </div>
      ) : (
        <div className="loading-text">没有数据了~</div>
      )}
    </div>
  );
}

ShowLoadmore.defaultProps = {
  showLoadMore: true,
};

ShowLoadmore.propTypes = {
  showLoadMore: PropTypes.bool.isRequired,
};
