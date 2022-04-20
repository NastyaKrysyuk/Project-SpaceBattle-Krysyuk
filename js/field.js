game.field = {
  game: game,
  height: 16,
  width: 14,
  offsetX: 0,
  offsetY: 0,
  cells: [],
  aster: [],
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
    const cellSize = this.game.sprites.cell.width;
    this.offsetX = (this.game.width / 2) - (cellSize * this.width / 2);
    this.offsetY = (this.game.height / 2) - (cellSize * this.height / 2);

    return {
      row: row,
      col: col,
      x: this.offsetX + cellSize * col,
      y: this.offsetY + cellSize * row
    };
  },
  createAsteroid() {
    this.aster.push({
      x: Math.floor(Math.random() * ((this.offsetX + this.game.sprites.cell.width*this.width-this.game.sprites.asteroid.width) - this.offsetX) + this.offsetX),
      
    });

    console.log("1")
    console.log(this.aster)

  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });

  }
};