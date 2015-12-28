var momObj = function()
{
  this.x;
  this.y;
  this.angle;

  this.bigEye = [];
  this.bigEyeTimer;
  this.bigEyeCount;
  this.bigEyeInterval;

  this.bigBodyOrange = [];
  this.bigBodyBlue = [];
  this.bigBodyCount;

  this.bigTail = [];
  this.bigTailTimer;
  this.bigTailCount;
}

momObj.prototype.init = function()
{
  this.angle = 0;
  this.x = canWidth * 0.5;
  this.y = canHeight * 0.5;

  for(var i = 0; i < 2; i++) {
    this.bigEye[i] = new Image();
    this.bigEye[i].src = "./img/bigEye" + i +".png";
  }
  this.bigEyeTimer = 0;
  this.bigEyeCount = 0;
  this.bigEyeInterval = 2000;

  for(var i = 0; i < 8; i++)
  {
    this.bigBodyOrange[i] = new Image();
    this.bigBodyOrange[i].src = "./img/bigSwim" + i + ".png";
    this.bigBodyBlue[i] = new Image();
    this.bigBodyBlue[i].src = "./img/bigSwimBlue" + i + ".png";
  }
  this.bigBodyCount = 0;

  for(var i = 0; i < 8; i++) {
    this.bigTail[i] = new Image();
    this.bigTail[i].src = "./img/bigTail" + i + ".png";
  }
  this.bigTailTimer = 0;
  this.bigTailCount = 0;
}

momObj.prototype.draw = function()
{
  this.bigTailTimer += deltaTime;
  if(this.bigTailTimer > 50)
  {
    this.bigTailCount = (this.bigTailCount + 1) % 8;
    this.bigTailTimer = 0;
  }

  this.bigEyeTimer += deltaTime;
  if(this.bigEyeTimer > this.bigEyeInterval)
  {
    this.bigEyeCount = (this.bigEyeCount + 1) % 2;
    this.bigEyeTimer = 0;
    this.bigEyeInterval = this.bigEyeCount == 0 ? Math.random() * 1500 + 2000 : 100;
  }

  ctx1.save();
  this.x = lerpDistance(mx, this.x, 0.98);
  this.y = lerpDistance(my, this.y, 0.98);

  var deltaY = my - this.y;
  var deltaX = mx - this.x;
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;

  this.angle = lerpAngle(beta, this.angle, 0.5);

  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);
  var tailCount = this.bigTailCount;
  var eyeCount = this.bigEyeCount;
  var bodyCount = this.bigBodyCount;
  ctx1.drawImage(this.bigTail[tailCount],  -this.bigTail[tailCount].width * 0.5 + 30, -this.bigTail[tailCount].height * 0.5);
  if(data.double == 1)
  {
    ctx1.drawImage(this.bigBodyOrange[bodyCount],  -this.bigBodyOrange[bodyCount].width * 0.5, -this.bigBodyOrange[bodyCount].height * 0.5);
  }
  else
  {
    ctx1.drawImage(this.bigBodyBlue[bodyCount],  -this.bigBodyBlue[bodyCount].width * 0.5, -this.bigBodyBlue[bodyCount].height * 0.5);
  }
  ctx1.drawImage(this.bigEye[eyeCount], -this.bigEye[eyeCount].width * 0.5, -this.bigEye[eyeCount].height * 0.5);
  ctx1.restore();
}
