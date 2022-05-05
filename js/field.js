game.field = {
  game: game,
  height: 18,
  width: 14,
  offsetX: 0,
  offsetY: 0,
  cells: [],
  aster: [],
  expl: [],
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

  createObject(typeObj, obj) {
    this.aster.push({
      x: Math.floor(Math.random() * ((this.offsetX + this.game.sprites.cell.width * this.width - obj.width) ) + this.offsetX),
      y: this.offsetY,
      angle: 0,
      dxangle: Math.random() * 0.2 - 0.1,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 + 1,
      del: 0,
      type: typeObj
    });
  },

  collides(obj1X, obj1Y, obj2X, obj2Y, obj1H, obj1W, obj2H, obj2W) {
    return obj1X < obj2X + obj2W / 4 &&
      obj1X + obj1W / 4 > obj2X &&
      obj1Y < obj2Y + obj2H / 4 &&
      obj1H / 4 + obj1Y > obj2Y
  },

  updateObject() {
    for (var i in this.aster) {

      this.aster[i].y += this.aster[i].dy;
      this.aster[i].x += this.aster[i].dx;
      this.aster[i].angle = this.aster[i].angle + this.aster[i].dxangle;

      if (this.aster[i].y >= this.offsetY + this.height * this.game.sprites.cell.height - 50) {
        if (this.aster[i].type === "asteroid") {
          //минус жизнь
          document.querySelector('.lives').firstChild.remove();
        }
        this.aster.splice(i, 1)
      }
      if (this.aster[i].x <= this.offsetX || this.aster[i].x >= this.offsetX + this.game.sprites.cell.width * this.width - this.game.sprites.asteroid.width) {
        this.aster[i].dx = -this.aster[i].dx;
      }

      for (var j in this.game.character.fire) {
        if (this.collides(this.game.character.fire[j].x, this.game.character.fire[j].y, this.aster[i].x, this.aster[i].y, this.game.sprites.shot.height, this.game.sprites.shot.width, this.game.sprites.asteroid.height, this.game.sprites.asteroid.width) && this.aster[i].type === "asteroid") {
          console.log('boom');
          this.expl.push({
            x: this.aster[i].x,
            y: this.aster[i].y,
            animx: 0,
            animy: 0
          });
          this.aster[i].del = 1;
          this.game.character.fire.splice(j, 1); break;
        }
        
      }
      if (this.aster[i].del == 1) this.aster.splice(i, 1);
    }

    //Анимация взрывов
    for (i in this.expl) {
      this.expl[i].animx = this.expl[i].animx + 2;
      if (this.expl[i].animx > 5) { this.expl[i].animy++; this.expl[i].animx = 0 }
      if (this.expl[i].animy > 7)
        this.expl.splice(i, 1);
    }
  },

  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });
    for (var i in this.aster) {
      if (this.aster[i].type === "asteroid") {
        // this.game.ctx.drawImage(this.game.sprites.asteroid, this.aster[i].x, this.aster[i].y, 30, 30);
        this.game.ctx.save();
        this.game.ctx.translate(this.aster[i].x + 25, this.aster[i].y + 25);
        this.game.ctx.rotate(this.aster[i].angle);
        this.game.ctx.drawImage(this.game.sprites.asteroid, -25, -25, 30, 30);
        this.game.ctx.restore();
      } else {
        this.game.ctx.drawImage(this.game.sprites.live, this.aster[i].x, this.aster[i].y, 20, 20);
      }
    }
    for (var i in this.expl) {
      this.game.ctx.drawImage(this.game.sprites.explosion, 128 * Math.floor(this.expl[i].animx), 128 * Math.floor(this.expl[i].animy), 128, 128, this.expl[i].x, this.expl[i].y, 30, 30);

    }

  }
};