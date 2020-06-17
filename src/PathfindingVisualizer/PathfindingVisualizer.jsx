 
import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    render() {
        const {grid} = this.state;

        return(
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col} = node;
                                return (<Node
                                    row = {row}
                                    col = {col}
                                    key = {nodeIdx}
                                ></Node>);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 15; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push({row, col});
        }
        grid.push(currentRow)
    }
    return grid;
};