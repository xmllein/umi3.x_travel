import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
// 样式
import './index.less';

function Register(props) {
  // 用户注册
  const {
    user: { registerAsync },
  } = useStoreHook();

  const [state, setState] = useState();

  //rc-form
  const { getFieldProps, validateFields } = props.form;

  useEffect(() => {}, []);

  // 注册
  const handleSubmit = () => {
    // 验证表单
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请填写完整信息');
        return;
      }

      // 判断两次密码是否一致
      if (value.password !== value.password2) {
        Toast.fail('两次密码不一致');
        return;
      }

      registerAsync({
        ...value,
      });
      // console.log(value);
    });
  };

  // 去登录
  const handleClick = () => {
    history.push('/login');
  };

  return (
    <div className="register-page">
      <List renderHeader={() => '用户注册'}>
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
        <InputItem
          {...getFieldProps('password2', {
            rules: [
              { required: true, message: '请输入确认密码' },
              {
                validator: (rule, value, callback) => {
                  if (value && value !== props.form.getFieldValue('password')) {
                    callback('两次输入密码不一致！');
                  } else {
                    callback();
                  }
                },
              },
            ],
          })}
          placeholder="请输入确认密码："
        >
          确认密码：
        </InputItem>
      </List>
      <Button
        type="warning"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        注册
      </Button>
      <div className="login" onClick={handleClick}>
        已有账户，去登录
      </div>
    </div>
  );
}

export default createForm()(Register);
