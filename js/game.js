let game = {
  started: false,
  canvas: null,
  ctx: null,
  field: null,
  character: null,
  width: 0,
  height: 0,
  score: 0,
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
    character:null,
    character1:null,
    character2:null,
    background: null,
    shot: null,
    life: null,
    protection: null,
    asteroid: null,
    cell: null,
    explosion: null,
    shield:null
  },

  start() {
    this.init();
    this.preload(() => {
      this.run();
    });
  },
  init() {
    this.canvas = document.getElementById('mycanvas');
    this.canvas.style.cursor="none";
    console.log(this.canvas)
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
    this.character.init()
    
    this.gameInterval = setInterval(() => {
      this.update();
      // this.character.onProtect();
    }, 50);

    this.asterInterval = setInterval(() => {
      this.field.createObject('asteroid', this.sprites.asteroid);
    }, 300);

    this.fireInterval = setInterval(() => {
      this.character.createFire();
    }, 500);

    this.protectionInterval= setInterval(() => {
      this.field.createObject('protection', this.sprites.protection);
    }, 20000);

    this.bonusInterval = setInterval(() => {
      const countLives = document.querySelector('.lives').childElementCount;
      if (countLives < 3 && countLives > 0) {
        this.field.createObject('bonus', this.sprites.bonus);
      }
    }, 8000);
  },

  create() {
    this.field.create();
    this.field.createObject('asteroid', this.sprites.asteroid);
    this.character.createFire();

    window.addEventListener('mousemove', (event) => {
      this.character.start(event.offsetX);
    });
    //  this.character.init()
  },
  update() {
    this.render();
    this.field.updateObject();
    this.character.updateFire();
    
  },
  asterExploded(){
    var score = this.score++;
    document.getElementById('score').textContent = score;
  },
  bonusExploded(){
    var container = document.querySelector('.lives');
    var addLife=document.createElement('img');
    addLife.src="img/life.png";
    container.appendChild(addLife);
  },
  gameOver(){
    clearInterval(this.gameInterval);
    clearInterval(this.asterInterval);
    clearInterval(this.fireInterval);
    clearInterval(this.bonusInterval);
    this.saveScore();
    
    this.started=false;
    document.location.reload();
  },
  saveScore(){
    var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
    var password = Math.random();
    let name = prompt("Please enter your name?", "");
      var fHash = {};
      if(name){  
       fHash[name]= document.getElementById('score').textContent
      }
      console.log(fHash)
    $.ajax(AjaxHandlerScript,
      {
        type: "POST",
        cache: false,
        dataType: "json",
        data: {
          f: "LOCKGET",
          n: "NastyaK_test",
          p: password
        },
        success:$.ajax(AjaxHandlerScript,
          {
            type: "POST",
            cache: false,
            dataType: "json",
            data: {
              f: "UPDATE",
              n: "NastyaK_test",
              p: password,
              v: JSON.stringify(fHash)
          },
          success:function(data){console.log("DataLoadedUpdate - " + data.result)} ,
          error: this.ErrorHandler
        }
        ) ,
        error: this.ErrorHandler
      }
    );
  },
  ErrorHandler(jqXHR, StatusStr, ErrorStr){
    alert(StatusStr + " " + ErrorStr);
  },

  render() {
    // отрисовка элементов на canvas
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.sprites.background, 0, 0);
      this.field.render();
      this.character.create();
    });
  }
}

window.addEventListener('load', () => {
  game.start();
  
});

