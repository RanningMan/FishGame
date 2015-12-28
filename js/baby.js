var babyObj = function()
{
  this.x;
  this.y;
  this.angle;

  this.babyEye = [];
  this.babyEyeTimer;
  this.babyEyeCount;
  this.babyEyeInterval;

  this.babyBody = [];
  this.babyBodyTimer;
  this.babyBodyCount;

  this.babyTail = [];
  this.babyTailTimer;
  this.babyTailCount;
}

babyObj.prototype.init = function()
{
  this.x = canWidth * 0.5;
  this.y = canHeight * 0.5;
  this.angle = 0;

  for(var i = 0; i < 2; i++)
  {
    this.babyEye[i] = new Image();
    this.babyEye[i].src = "./img/babyEye" + i + ".png";
  }
  this.babyEyeTimer = 0;
  this.babyEyeCount = 0;
  this.babyEyeInterval = 2000;

  for(var i = 0; i < 20; i++)
  {
    this.babyBody[i] = new Image();
    this.babyBody[i].src = "./img/babyFade" + i + ".png";
  }
  this.babyBodyTimer = 0;
  this.babyBodyCount = 0;

  for(var i = 0; i < 8; i++)
  {
    this.babyTail[i] = new Image();
    this.babyTail[i].src = "./img/babyTail" + i + ".png";
  }
  this.babyTailTimer = 0;
  this.babyTailCount = 0;
}

babyObj.prototype.draw = function()
{
  this.babyTailTimer += deltaTime;
  if(this.babyTailTimer > 50)
  {
    this.babyTailCount = (this.babyTailCount + 1) % 8;
    this.babyTailTimer = 0;
  }

  this.babyEyeTimer += deltaTime;
  if(this.babyEyeTimer > this.babyEyeInterval)
  {
    this.babyEyeInterval = this.babyEyeCount == 1 ? Math.random() * 1500 + 2000 : 200;
    this.babyEyeCount = (this.babyEyeCount + 1) % 2;
    this.babyEyeTimer = 0;
  }

  this.babyBodyTimer += deltaTime;
  if(this.babyBodyTimer > 400)
  {
    this.babyBodyCount++;
    if(this.babyBodyCount >= 20)
    {
      this.babyBodyCount = 19;
      //game over
      data.gameOver = true;
    }
    this.babyBodyTimer = 0;
  }

  ctx1.save();

  this.x = lerpDistance(mom.x, this.x, 0.99);
  this.y = lerpDistance(mom.y, this.y, 0.99);

  var deltaY = mom.y - this.y;
  var deltaX = mom.x - this.x;
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;

  this.angle = lerpAngle(beta, this.angle, 0.6);

  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);
  ctx1.drawImage(this.babyTail[this.babyTailCount], -this.babyTail[this.babyTailCount].width * 0.5 + 23, -this.babyTail[this.babyTailCount].height * 0.5);
  ctx1.drawImage(this.babyBody[this.babyBodyCount], -this.babyBody[this.babyBodyCount].width * 0.5, -this.babyBody[this.babyBodyCount].height * 0.5);
  ctx1.drawImage(this.babyEye[this.babyEyeCount], -this.babyEye[this.babyEyeCount].width * 0.5, -this.babyEye[this.babyEyeCount].height * 0.5);
  ctx1.restore();
}
