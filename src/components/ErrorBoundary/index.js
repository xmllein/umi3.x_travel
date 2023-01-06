import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log('error', error);
    return { flag: true };
  }

  componentDidCatch(error, info) {
    console.log('error', error);
    console.log('info', info);
  }

  render() {
    return (
      <div>
        {this.state.flag ? (
          <div>发生错误，请稍后再试</div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
