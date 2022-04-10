const game={
  canvas:null,
  ctx:null,
  width: 0,
  height: 0,
  score: document.getElementById('score'),
  dimensions: {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300
    }
  },
  sprites: {
    background: null,
    character: null,
    shot: null,
    live: null,
    bonus: null,
    asteroid: null
  },
  start() {
    this.init();
    // function () {} ---- () => {}
    this.preload(() => {
      this.run();
    });
  },
  init() {
    this.canvas = document.getElementById('mycanvas');
    this.ctx = this.canvas.getContext('2d');
    this.initDimensions();
    this.setTextFont();
  },
  setTextFont() {
    this.ctx.font = '38px monospace';
    this.ctx.fillStyle = '#d5e3e6';
  },
  initDimensions() {
    let data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };

    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
      this.fitWidth(data);
    } else {
      this.fitHeight(data);
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },
  fitWidth(data) {
    this.height = Math.round(this.width * data.realHeight / data.realWidth);
    this.height = Math.min(this.height, data.maxHeight);
    this.height = Math.max(this.height, data.minHeight);
    this.width = Math.round(data.realWidth * this.height / data.realHeight);
    this.canvas.style.height = '100%';
  },
  fitHeight(data) {
    this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);
    this.height = Math.round(this.width * data.realHeight / data.realWidth);
    this.canvas.style.height = '100%';
  },
  preload(callback) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;

    let onAssetLoad = () => {
      ++loaded;
      console.log(loaded);

      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onAssetLoad);
  },
  preloadSprites(onAssetLoad) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = './img/' + key + '.png';
      this.sprites[key].addEventListener('load', onAssetLoad);
    }
  },
  run() {
    // запуск игры
    console.log('запуск игры');
    this.create();
    this.update();
  },
  create(){},
  update(){
    this.render();
  },
  render(){
        // отрисовка элементов на canvas
        window.requestAnimationFrame(() => {
          this.ctx.clearRect(0, 0, this.width, this.height);
          this.ctx.drawImage(this.sprites.background, 0, 0);
          // this.ctx.fillText('Score: ' + this.score, 10.45, 30.25);
        });
  }
}

window.addEventListener('load', () => {
  game.start();
});