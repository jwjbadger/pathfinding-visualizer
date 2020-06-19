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
      holding: '',
      start: [START_ROW, START_COLUMN],
      finish: [FINISH_ROW, FINISH_COLUMN],
    };
  }

  componentDidMount() {
    const grid = getNewGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const grid = this.state.grid;
    if (grid[row][col].isStart) {
      this.setState({ holding: 'start', mouseIsPressed: true });
    } else if (grid[row][col].isFinish) {
      this.setState({ holding: 'finish', mouseIsPressed: true });
    } else {
      const newGrid = getGridWithWall(grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const { grid, holding } = this.state;
    if (holding === 'start') {
      const newGrid = updateStart(grid, row, col, this.state.start);
      if (newGrid) this.setState({ grid: newGrid, start: [row, col] });
    } else if (holding === 'finish') {
      const newGrid = updateFinish(grid, row, col, this.state.finish);
      if (newGrid) this.setState({ grid: newGrid, finish: [row, col] });
    } else {
      const newGrid = getGridWithWall(grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      holding: '',
    });
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
    const { grid, start, finish } = this.state;

    const startNode = grid[start[0]][start[1]];
    const finishNode = grid[finish[0]][finish[1]];

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

  newGrid[row][col].isWall = !newGrid[row][col].isWall;

  return newGrid;
};

const updateStart = (grid, row, col, start) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isFinish || node.isWall) return;

  node.isStart = true;
  newGrid[start[0]][start[1]].isStart = false;

  return newGrid;
};

const updateFinish = (grid, row, col, finish) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isWall) return;

  node.isFinish = true;
  newGrid[finish[0]][finish[1]].isFinish = false;

  return newGrid;
};
