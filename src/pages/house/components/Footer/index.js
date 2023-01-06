import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';

export default function (props) {
  const [show, setShow] = useState(false);
  // text: 评论内容
  const [commentsValue, setCommentsValue] = useState('');

  // 获取store
  const {
    house: { addCommentsAsync },
  } = useStoreHook();

  useEffect(() => {}, []);

  // 点击评论按钮
  const handleClick = () => {
    // 显示模态框
    setShow(true);
  };

  // 关闭模态框
  const handleClose = () => {
    setShow(false);
  };

  // 评论输入框改变
  const hanleChange = (val) => {
    setCommentsValue(val);
  };

  // 提交评论
  const handleSubmit = () => {
    // console.log('提交评论');
    if (!commentsValue) {
      Toast.fail('评论内容不能为空');
      return;
    } else {
      // 提交评论
      addCommentsAsync({ comment: commentsValue });
      // 关闭模态框
      handleClose();
    }
  };

  return (
    <>
      <div className="footer" onClick={handleClick}>
        评论~
      </div>

      <Modal
        show={show}
        styleBody={{
          height: '220px',
          bottom: '0px',
          top: 'unset',
          background: '#fff',
        }}
        onClose={handleClose}
      >
        <div className="modal-comment">
          <TextareaItem rows={2} count={200} onChange={hanleChange} />
          <Button className="comment-btn" type="warning" onClick={handleSubmit}>
            评论
          </Button>
        </div>
      </Modal>
    </>
  );
}
