Path = function(movements)
{
  this.movements = movements;
};

Path.prototype.getX = function(time)
{
  for (var i = 0, mov; mov = this.movements[i]; i++)
  {
    if (mov.duration >= time)
    {
      return mov.getX(time);
    }
    else
    {
      time -= mov.duration;
    }
  }
};

Path.prototype.getY = function(time)
{
  for (var i = 0, mov; mov = this.movements[i]; i++)
  {
    if (mov.duration >= time)
    {
      return mov.getY(time);
    }
    else
    {
      time -= mov.duration;
    }
  }
};
