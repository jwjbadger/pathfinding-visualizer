import React, { Component } from 'react';
import Node from './Node/Node';

import { dijkstra, getDijkstraPath } from '../Algorithms/pathfinding/dijkstra';
import { aStar, getStarPath } from '../Algorithms/pathfinding/aStar';

import { randWeight } from '../Algorithms/maze/randWeight';

import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
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
      algorithm: 'dijkstra',
      create: 'walls',
      start: [START_ROW, START_COLUMN],
      finish: [FINISH_ROW, FINISH_COLUMN],
    };
  }

  componentDidMount() {
    const grid = getNewGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const { grid, create } = this.state;
    if (grid[row][col].isStart) {
      this.setState({ holding: 'start', mouseIsPressed: true });
    } else if (grid[row][col].isFinish) {
      this.setState({ holding: 'finish', mouseIsPressed: true });
    } else {
      const newGrid = getGridWithSomething(grid, create, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const { grid, holding, create } = this.state;
    if (holding === 'start') {
      const newGrid = updateStart(grid, row, col, this.state.start);
      if (newGrid) this.setState({ grid: newGrid, start: [row, col] });
    } else if (holding === 'finish') {
      const newGrid = updateFinish(grid, row, col, this.state.finish);
      if (newGrid) this.setState({ grid: newGrid, finish: [row, col] });
    } else {
      const newGrid = getGridWithSomething(grid, create, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      holding: '',
    });
  }

  animateAlgorithm(orderedNodes, nodesInPath) {
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

  visualizeAlgorithm() {
    const { grid, start, finish, algorithm } = this.state;

    const startNode = grid[start[0]][start[1]];
    const finishNode = grid[finish[0]][finish[1]];

    const orderedNodes =
      algorithm === 'aStar'
        ? aStar(grid, startNode, finishNode)
        : dijkstra(grid, startNode, finishNode);
    const nodesInPath =
      algorithm === 'aStar'
        ? getStarPath(finishNode)
        : getDijkstraPath(finishNode);

    this.animateAlgorithm(orderedNodes, nodesInPath);
  }

  clearGrid() {
    window.location.reload(false);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className='header'>
          <DropdownButton title='Algorithm' variant='info' id='buttons'>
            <Dropdown.Item
              eventKey='1'
              onClick={() => {
                this.setState({ algorithm: 'dijkstra' });
              }}>
              Dijkstra's
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='2'
              onClick={() => {
                this.setState({ algorithm: 'aStar' });
              }}>
              A*
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton title='Creation Selector' variant='info' id='buttons'>
            <Dropdown.Item
              eventKey='1'
              onClick={() => {
                this.setState({ create: 'walls' });
              }}>
              Walls
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='2'
              onClick={() => {
                this.setState({ create: 'weights' });
              }}>
              Weights
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton title='Generate Maze' variant='info' id='buttons'>
            <Dropdown.Item
              eventKey='1'
              onClick={() => {
                this.setState({ grid: randWeight(this.state.grid) });
              }}>
              Random Weight
            </Dropdown.Item>
          </DropdownButton>
          <Button
            variant='info'
            id='buttons'
            onClick={() => this.visualizeAlgorithm()}>
            Visualize
          </Button>
          <Button variant='info' id='buttons' onClick={() => this.clearGrid()}>
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
                    isWeight,
                  } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isWall={isWall}
                      isWeight={isWeight}
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
    weightDistance: Infinity,
    isWall: false,
    isWeight: false,
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

const getGridWithSomething = (grid, create, row, col) => {
  const newGrid = grid.slice();

  if (create === 'walls' && !newGrid[row][col].isWeight) {
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
  } else if (create === 'weights' && !newGrid[row][col].isWall) {
    newGrid[row][col].isWeight = !newGrid[row][col].isWeight;
  }

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
