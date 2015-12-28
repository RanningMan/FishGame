function momFruitCollision()
{
  if(!data.gameOver)
  {
    for(var i = 0; i < fruit.num; i++)
    {
      if(fruit.alive[i])
      {
        var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
        if(l < 900)
        {
          fruit.dead(i);
          data.fruitNum++;
          if(fruit.fruitType[i] == "blue")
          {
            data.double = 2;
          }
          mom.bigBodyCount++;
          if(mom.bigBodyCount > 7)
            mom.bigBodyCount = 7;
        }
      }
    }
  }
}

function momBabyCollision()
{
  if(data.fruitNum > 0 && !data.gameOver)
  {
    var l = calLength2(baby.x, baby.y, mom.x, mom.y);
    if(l < 900)
    {
      baby.babyBodyCount = 0; //baby recover
      mom.bigBodyCount = 0;
      data.addScore();
    }
  }
}
