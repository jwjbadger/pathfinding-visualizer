import React, { Component } from 'react';
import Node from './Node/Node';

import { dijkstra, getPath } from '../Algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_ROW = 10;
const START_COLUMN = 5;
const FINISH_ROW = 5;
const FINISH_COLUMN = 40;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <div className='grid'>
        {/* Iterate over each row in the grid */}
        {grid.map((row, rowIdx) => {
          // Return each row, with nodes created
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart } = node;
                return (
                  <Node
                    row={row}
                    col={col}
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const createNewNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_ROW && col === START_COLUMN,
    isFinish: row === FINISH_ROW && col === FINISH_COLUMN,
  };
};

const getInitialGrid = () => {
  const grid = [];

  // Iterate over each row and column, and add each full row to grid
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNewNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};
