var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


// var asteroid={
//   x:0,
//   y:400,
//   dx:1,
//   dy:3,
// };

var asteroid = [];
// asteroid.push({
//   x: 0,
//   y: 400,
//   dx: 1,
//   dy: 3,
// })

//загрузка img
var background_img = new Image();
background_img.src = './img/background/background1.jpg';
var asteroid_img = new Image();
asteroid_img.src = './img/asteroid.png';

background_img.onload = function () {
  game();
}

//игровой цикл с частой обновления матрицы
function game() {
  update();
  render();
  requestAnimationFrame(game);
}

//физика столкновений, пермещений и тд
function update() {
  setTimeout(function(){
    asteroid.push({
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600),
      dx: 1,
      dy: 2,
    })
  },0)
  //перемещаем астероид по x и y
  for (i in asteroid) {
    asteroid[i].x += asteroid[i].dx;
    asteroid[i].y += asteroid[i].dy;
    //если достигнет правой стороны канваса или левой полетит обратно(меняем знак)
    if (asteroid[i].x >= canvas.width - asteroid_img.width / 2 || asteroid[i].x < 0) {
      asteroid[i].dx = -asteroid[i].dx;
    }
    //если астероид достигнет низа либо верха полетит обратно(меняем знак)
    if (asteroid[i].y >= canvas.height - asteroid_img.height / 2 || asteroid[i].y < 0) {
      asteroid[i].dy = -asteroid[i].dy;
    }
  }
}

//отрисовка
function render() {
  context.drawImage(background_img, 0, 0, 800, 600);
  for (i in asteroid){
    context.drawImage(asteroid_img, asteroid[i].x, asteroid[i].y, 50, 50);
  }
  
}
