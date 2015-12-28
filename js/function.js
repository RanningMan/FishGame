var canvas1;
var canvas2;

var canWidth;
var canHeight;

var mx;
var my;

var ctx1;
var ctx2;

var lastTime = Date.now();;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;

var data;

window.onload = function ()
{
  init();
  gameloop();
}

function init()
{
  canvas1 = document.getElementById("canvas1");
  ctx1 = canvas1.getContext("2d");
  canvas2 = document.getElementById("canvas2");
  ctx2 = canvas2.getContext("2d");

  canvas1.addEventListener('mousemove', onMouseMove, false);

  bgPic.src = "./img/background.jpg";
  canWidth = canvas1.width;
  canHeight = canvas1.height;

  ane = new aneObj();
  ane.init();

  fruit = new fruitObj();
  fruit.init();

  mom = new momObj();
  mom.init();

  baby = new babyObj();
  baby.init();

  mx = canWidth * 0.5;
  my = canHeight * 0.5;

  data = new dataObj();

  ctx1.font = "30px Verdana";
  ctx1.texAlign = "center";
}

function gameloop() {
  window.requestAnimFrame(gameloop);
  var now = Date.now();
  deltaTime = now - lastTime;
  lastTime = now;

  if(deltaTime > 40)
    deltaTime = 40;

  drawBackground();
  ane.draw();
  fruitMonitor();
  fruit.draw();

  ctx1.clearRect(0, 0, canWidth, canHeight);
  mom.draw();
  baby.draw();
  data.draw();

  momFruitCollision();
  momBabyCollision();
}

function fruitMonitor()
{
  var num = 0;
  for(var i = 0; i < fruit.num; i++)
  {
    if(fruit.alive[i])
      ++num;
  }
  if(num < 15)
  {
    sendfruit();
    return;
  }
}

function sendfruit()
{
  for(var i = 0; i < fruit.num; i++)
  {
    if(fruit.alive[i] == false) {
      fruit.born(i);
      return;
    }
  }
}

function onMouseMove(e)
{
  if(!data.gameOver)
  {
    if(e.offSetX || e.layerX)
    {
      mx = e.offSetX == undefined ? e.layerX : e.offSetX;
      my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
  }
}
