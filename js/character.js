game.character = {
  game: game,
  X: 0,
  Y: 0,
  init(){
    this.game.canvas.addEventListener("mousemove", function (event) {
      console.log(event)
      this.X = event.offsetX - 25;
      this.Y = event.offsetY - 13;
    });
    
 },
  create() {
  
  this.game.ctx.drawImage(this.game.sprites.character, this.X, this.Y, 40, 40);   
  }

}