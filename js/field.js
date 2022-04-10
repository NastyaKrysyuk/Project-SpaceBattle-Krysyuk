game.field={
  game: game,
  height:500,
  width:500,
  x:200,
  y:50,
  render() {
    this.game.ctx.strokeStyle='#7757b171';
    this.game.ctx.strokeRect(this.x,this.y, this.width,this.height);
  }
}