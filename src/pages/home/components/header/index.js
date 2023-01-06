import React, { useState, useEffect, memo } from 'react';
import { Link } from 'umi';
import { cookie } from 'project-libs';

function Header(props) {
  useEffect(() => {
    // 测试cookie
    console.log(cookie.get());
  }, []);

  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        {cookie.get('user') ? (
          cookie.get('user').username
        ) : (
          <>
            <Link to="/login">登录</Link> | <Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(Header);
