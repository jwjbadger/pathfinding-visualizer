export function randWall(grid) {
  const returnGrid = grid;

  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[0].length; col++) {
      const node = returnGrid[row][col];

      if (node.isFinish || node.isStart || node.isWeight) {
        currentRow.push(node);
        continue;
      }

      node.isWall = Math.random() >= 0.7;
      currentRow.push(node);
    }
    returnGrid[row] = currentRow;
  }
  return returnGrid;
}
