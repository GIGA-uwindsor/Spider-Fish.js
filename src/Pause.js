function Pause(duration) 
{
  Movement.call(this, duration);
}
obj.extend(Pause, Movement);

Pause.prototype.getX = function(time) 
{
  return 0;
}

Pause.prototype.getY = function(time) 
{
  return 0;
}

Pause.prototype.update = function(ticks) 
{
  this.timeElapsed += ticks;
  if (this.timeElapsed > this.duration) 
  {
    this.timeElapsed = this.duration;
  }
}

Pause.prototype.isDone = function() 
{
  return this.timeElapsed >= this.duration;
}
