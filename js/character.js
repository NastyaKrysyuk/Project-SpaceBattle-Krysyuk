game.character={
  game:game,
  X:0,
  Y:0,
  create(){
console.log(game.width)
var img=new Image();
 img.src="C:\project-gameSB\Project-SpaceBattle-Krysyuk\img\asteroid_svg.svg"
this.X=game.width/2,
this.Y=game.height/2,
    this.game.ctx.drawImage(img, this.X, this.Y,50,50);
  }
}