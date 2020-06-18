import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const { row, col, key, isStart, isFinish } = this.props;

    const extraClass = isFinish ? 'node-finish' : isStart ? 'node-start' : '';

    return <div id={`node-${row}-${col}`} className={`node ${extraClass}`} />;
  }
}
