game.character = {
  game: game,
  moveX: 0,
  moveY: 0,
  fire: [],
  animx: 0,
  animy: 0,
  isProtected:false,
  //координаты героя при загрузке
  init() {
    this.moveX = game.field.offsetX + (game.field.width * game.sprites.cell.width) / 2 - 20;
    this.moveY = game.field.offsetY + game.field.height * game.sprites.cell.height - game.sprites[localStorage.getItem("character")].height / 2;
  },
  createFire() {
    this.fire.push({
      x: this.moveX + 10,
      y: this.moveY - 10,
      dx: -0.2,
      dy: -2.5
    })
    this.fire.push({
      x: this.moveX + 10,
      y: this.moveY - 10,
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
  start(offsetX) {
    game.character.moveX = offsetX;
    if (game.character.moveX <= game.field.offsetX) {
      game.character.moveX = game.field.offsetX;
    } else if (game.character.moveX >= game.field.offsetX + game.field.width * game.sprites.cell.width - game.sprites[localStorage.getItem("character")].width / 2) {
      game.character.moveX = game.field.offsetX + game.field.width * game.sprites.cell.width - game.sprites[localStorage.getItem("character")].width / 2
    }
  },

  onProtect() {
    this.animx = this.animx + 1;
    if (this.animx > 4) {
      this.animy++; this.animx = 0;
    }
    if (this.animy > 3) {
      this.animx = 0; this.animy = 0;
    }
  },

  render() {
    this.fire.forEach((fire) => {
      this.game.ctx.drawImage(this.game.sprites.shot, fire.x, fire.y, 20, 20);
    });
    this.game.ctx.drawImage(this.game.sprites[localStorage.getItem("character")], this.moveX, this.moveY, 50, 50);
    this.game.ctx.drawImage(this.game.sprites.shield, 192 * Math.floor(this.animx), 192 * Math.floor(this.animy), 192, 192, this.moveX - 15, this.moveY - 10, 80, 80);
  }
}
