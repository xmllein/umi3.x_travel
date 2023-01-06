import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
// 样式
import './index.less';

function Login(props) {
  // 用户登录
  const {
    user: { loginAsync },
  } = useStoreHook();

  const [state, setState] = useState();

  //rc-form
  const { getFieldProps, validateFields } = props.form;

  useEffect(() => {}, []);

  // 登录
  const handleSubmit = () => {
    // 验证表单
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请填写完整信息');
        return;
      }
      loginAsync({
        ...value,
      });
      // console.log(value);
    });
  };

  // 去注册
  const handleClick = () => {
    history.push('/register');
  };

  return (
    <div className="login-page">
      <List renderHeader={() => '用户登录'}>
        <InputItem
          {...getFieldProps('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })}
          placeholder="请输入用户名"
        >
          用户名：
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })}
          placeholder="请输入密码"
        >
          密码：
        </InputItem>
      </List>
      <Button
        type="warning"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        登录
      </Button>
      <div className="register" onClick={handleClick}>
        没有账户，去注册
      </div>
    </div>
  );
}

export default createForm()(Login);
