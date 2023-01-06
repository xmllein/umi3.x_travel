import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  const {
    user: { editUserAsync },
  } = useStoreHook();

  // 上传图片
  const [files, setFiles] = useState([]);

  //rc-form
  const { getFieldProps, validateFields } = props.form;

  useEffect(() => {
    console.log(props);
  }, []);

  // 上传图片
  const handleChange = (files, type, index) => {
    // console.log(files, type, index);
    // 判断图片大小
    if (files[0].file.size > 1024 * 1024 > 0.1) {
      Toast.fail('图片大小不能超过1M');
      return;
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
        img: files[0].url,
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
          {...getFieldProps('tel', {
            rules: [
              {
                required: true,
                message: '请输入电话',
              },
            ],
            initialValue: '123',
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
            initialValue: '签名',
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
