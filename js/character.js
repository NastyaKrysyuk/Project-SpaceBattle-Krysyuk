game.character = {
  game: game,
  moveX: game.field.offsetX + 100,
  moveY: 200,
  fire: [],
  createFire() {
    // this.fire.push({
    //   x: this.moveX,
    //   y: this.moveY,
    //   dx: 0,
    //   dy: -3
    // })
    this.fire.push({
      x: this.moveX,
      y: this.moveY,
      dx: -0.2,
      dy: -2.5
    })
    this.fire.push({
      x: this.moveX,
      y: this.moveY,
      dx: 0.2,
      dy: -2.5
    })
  },
  updateFire() {
    for (var i in this.fire) {
      this.fire[i].y += this.fire[i].dy;
      this.fire[i].x += this.fire[i].dx;
      if (this.fire[i].y <= this.game.field.offsetY || this.fire[i].x <= this.game.field.offsetX || this.fire[i].x >= this.game.field.offsetX + this.game.sprites.cell.width * this.game.field.width) {
        this.fire.splice(i, 1)
      }
    }
  },

  create() {
    this.game.ctx.drawImage(this.game.sprites.character, this.moveX, this.moveY, 40, 40);
    for (var i in this.fire) {
      this.game.ctx.drawImage(this.game.sprites.shot, this.fire[i].x, this.fire[i].y, 10, 10);
    }
  }
}

document.addEventListener('mousemove', function (event) {
  game.character.moveX = event.offsetX;
  // game.character.moveY = event.offsetY;
})