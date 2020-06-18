import React, { Component } from 'react';
import Node from './Node/Node';

import { dijkstra, getPath } from '../Algorithms/dijkstra';

import { Button } from 'react-bootstrap';
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
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getNewGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(orderedNodes, nodesInPath) {
    for (let i = 0; i <= orderedNodes.length; i++) {
      if (i === orderedNodes.length) {
        setTimeout(() => {
          this.animatePath(nodesInPath);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = orderedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          ' node-visited';
      }, 10 * i);
    }
  }

  animatePath(nodesInPath) {
    for (let i = 0; i < nodesInPath.length; i++) {
      setTimeout(() => {
        const node = nodesInPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          ' node-path';
      }, 50 * i);
    }
    return;
  }

  visualizeDijkstra() {
    const { grid } = this.state;

    const startNode = grid[START_ROW][START_COLUMN];
    const finishNode = grid[FINISH_ROW][FINISH_COLUMN];

    const orderedNodes = dijkstra(grid, startNode, finishNode);
    const nodesInPath = getPath(finishNode);

    this.animateDijkstra(orderedNodes, nodesInPath);
  }

  clearGrid() {
    window.location.reload(false);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className='header'>
          <Button variant='info' onClick={() => this.visualizeDijkstra()}>
            Visualize
          </Button>
          <Button variant='info' onClick={() => this.clearGrid()}>
            Clear
          </Button>
        </div>
        <div className='grid'>
          {/* Iterate over each row in the grid */}
          {grid.map((row, rowIdx) => {
            // Return each row, with nodes created
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isVisited,
                    isWall,
                  } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      key={nodeIdx}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createNewNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_ROW && col === START_COLUMN,
    isFinish: row === FINISH_ROW && col === FINISH_COLUMN,
    isVisited: false,
    distance: Infinity,
    isWall: false,
    previousNode: null,
  };
};

const getNewGrid = () => {
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

const getGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;

  return newGrid;
};
