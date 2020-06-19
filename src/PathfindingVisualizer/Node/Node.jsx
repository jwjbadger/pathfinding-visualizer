import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      isWall,
      isWeight,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    // Huge sequence of ternary operators that adds tags
    const extraClass = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isVisited
      ? 'node-visited'
      : isWall
      ? 'node-wall'
      : isWeight
      ? 'node-weight'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      />
    );
  }
}
