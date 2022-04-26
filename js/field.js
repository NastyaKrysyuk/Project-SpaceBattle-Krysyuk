game.field = {
  game: game,
  height: 18,
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
      y:this.offsetY,
      dx:1,
      dy:3
    });
  },

  updateAsteroid(){
    for(var i in this.aster){
        this.aster[i].y+=this.aster[i].dy;
     if(this.aster[i].y>=this.offsetY+this.height* this.game.sprites.cell.height-50){
      this.aster.splice(i,1)
      }
    }
  },

  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });
    for(var i in this.aster){this.game.ctx.drawImage(this.game.sprites.asteroid, this.aster[i].x,  this.aster[i].y,30,30);}
     
  }
};