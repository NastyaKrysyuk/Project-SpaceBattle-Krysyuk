game.field = {
  game: game,
  height: 16,
  width: 14,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
    console.log('cells', this.cells);
  },
  createCell(row, col) {
    const cellSize = this.game.sprites.cell.width ;
    let offsetX = (this.game.width / 2)-(cellSize*this.width/2);
    let offsetY = (this.game.height/ 2)-(cellSize*this.height/2);
    
    return {
      row: row,
      col: col,
      x: offsetX + cellSize * col,
      y: offsetY + cellSize * row
    };
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });
  }
};