function Pause(duration,point) 
{
  this.x = point.x;
  this.y = point.y;
  Movement.call(this, duration);
}
obj.extend(Pause, Movement);

Pause.prototype.getX = function(time) 
{
  return this.x;
}

Pause.prototype.getY = function(time) 
{
  return this.y;
}
