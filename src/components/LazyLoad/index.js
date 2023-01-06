import React, { Component, lazy, Suspense } from 'react';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderLazy = () => {
    let Lazy;
    const { component, delay, ...other } = this.props;
    if (!component || component.constructor.name !== 'Promise') {
      Lazy = import('./error');
    }

    // 异步加载组件
    Lazy = lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(component);
        }, delay || 300);
      });
    });

    return <Lazy {...other} />;
  };

  render() {
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          {this._renderLazy()}
        </Suspense>
      </div>
    );
  }
}
