var fruitObj = function()
{
  this.alive = [];
  this.x = [];
  this.y = [];
  this.l = [];
  this.spd = [];
  this.fruitType = [];
  this.orange = new Image();
  this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function()
{
  for(var i = 0; i < this.num; i++)
  {
    this.alive[i] = false;
    this.x[i] = 0;
    this.y[i] = 0;
    this.l[i] = 0;
    this.spd[i] = Math.random() * 0.017 + 0.01;
    this.fruitType[i] = "";
    this.born(i);
  }
  this.orange.src = "./img/fruit.png";
  this.blue.src = "./img/blue.png";
}

fruitObj.prototype.draw = function()
{
  for(var i = 0; i < this.num; i++)
  {
    if(this.alive[i] == true)
    {
      if(this.l[i] <= 15)
      {
        this.l[i] += this.spd[i] * deltaTime;
      }
      else
      {
        this.y[i] -= this.spd[i] * 7 * deltaTime;
      }
      if(this.fruitType[i] == "blue")
      {
        ctx2.drawImage(this.blue, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
      }
      else {
        ctx2.drawImage(this.orange, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
      }
    }
    if(this.y[i] < 0)
    {
      this.alive[i] = false;
    }
  }
}

fruitObj.prototype.born = function(i)
{
  var aneId = Math.floor(Math.random() * ane.num);
  this.x[i] = ane.x[aneId];
  this.y[i] = canHeight - ane.len[aneId];
  this.l[i] = 0;
  this.alive[i] = true;
  this.fruitType[i] = Math.random() < 0.1 ? "blue" : "orange";
}

fruitObj.prototype.dead = function(i)
{
  this.alive[i] = false;
}
