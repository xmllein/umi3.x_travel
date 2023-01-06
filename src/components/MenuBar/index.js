import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsBagFill,
  BsBag,
  BsPersonFill,
  BsPerson,
} from 'react-icons/bs';

import { history } from 'umi';

import './index.less';

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: '首页',
          selectedIcon: <BsHouseDoorFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsHouseDoor style={{ fontSize: '1.5rem' }} />,
          link: '/',
        },
        {
          title: '订单',
          selectedIcon: <BsBagFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsBag style={{ fontSize: '1.5rem' }} />,
          link: '/order',
        },
        {
          title: '我的',
          selectedIcon: <BsPersonFill style={{ fontSize: '1.5rem' }} />,
          icon: <BsPerson style={{ fontSize: '1.5rem' }} />,
          link: '/user',
        },
      ],
    };
  }

  render() {
    const { show, pathname } = this.props;
    return (
      <div className="menu-bar">
        <TabBar hidden={!show} unselectedTintColor="#949494">
          {this.state.items.map((item) => {
            return (
              <TabBar.Item
                title={item.title}
                key={item.link}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
                selected={pathname === item.link}
                onPress={() => {
                  history.push(item.link);
                }}
              />
            );
          })}
        </TabBar>
      </div>
    );
  }
}

MenuBar.defaultProps = {
  // 是否展示
  show: false,
  // 当前路径
  pathname: '',
};

MenuBar.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
};
