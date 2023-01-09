import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';
import { useLocation } from 'umi';

function Edit(props) {
  // 参数
  const { query } = useLocation();
  const {
    user: { editUserAsync, getUserAsync, avatar, phone, sign },
  } = useStoreHook();

  // 上传图片
  const [files, setFiles] = useState([
    {
      url: avatar,
    },
  ]);

  //rc-form
  const { getFieldProps, validateFields } = props.form;

  useEffect(() => {
    // console.log(props);
    // 获取用户信息
    getUserAsync({
      id: query?.id,
      usename: query?.username,
    });
  }, []);

  // 上传图片
  const handleChange = (files, type, index) => {
    // console.log(files, type, index);
    // 判断图片大小
    if (files[0]?.file) {
      if (files[0].file.size > 1024 * 1024 > 0.1) {
        Toast.fail('图片大小不能超过1M');
        return;
      }
    }
    setFiles(files);
  };

  // 提交
  const handleSubmit = () => {
    // 图片验证
    if (files.length === 0) {
      Toast.fail('请上传图片');
      return;
    }
    // 验证表单
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请填写完整信息');
        return;
      }
      editUserAsync({
        ...value,
        avatar: files[0].url,
      });
      Toast.success('修改成功');
    });
  };

  return (
    <div className="use-edit">
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />

        <InputItem
          {...getFieldProps('phone', {
            rules: [
              {
                required: true,
                message: '请输入电话',
              },
            ],
            initialValue: phone,
          })}
          placeholder="请输入电话"
        >
          电话：
        </InputItem>

        <InputItem
          {...getFieldProps('sign', {
            rules: [
              {
                required: true,
                message: '请输入签名',
              },
            ],
            initialValue: sign,
          })}
          placeholder="请输入签名"
        >
          签名：
        </InputItem>
      </List>
      <Button
        type="warning"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        修改
      </Button>
    </div>
  );
}

export default createForm()(Edit);
