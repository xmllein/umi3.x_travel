import React, { Component } from 'react';
import CraetePortal from '../CreatePortal';
import { Icon } from 'antd-mobile';
const Styles = {
  modal: {
    position: 'relative',
    top: '0',
    left: '0',
    zIndex: '999',
  },
  body: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.show,
    });
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  render() {
    const { show, styleBody, styleClose } = this.props;
    // 自定义样式
    const _styleBody = {
      ...Styles.body,
      ...styleBody,
    };
    const _styleClose = {
      ...Styles.close,
      ...styleClose,
    };
    return (
      <>
        {this.state.showModal ? (
          <CraetePortal style={Styles.modal}>
            <div style={_styleBody}>
              {this.props.children}
              <Icon
                type="cross"
                size="lg"
                style={_styleClose}
                onClick={this.handleClose}
              />
            </div>
          </CraetePortal>
        ) : null}
      </>
    );
  }
}
